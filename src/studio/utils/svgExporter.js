/**
 * svgExporter.js
 * ──────────────────────────────────────────────────────────────────────────────
 * Exports the studio canvas as a PRINT-READY vector SVG/PDF.
 *
 * Design goals:
 *   • Every element (die-lines, fills, images, text) remains an individual,
 *     selectable object when opened in CorelDRAW / Illustrator / Inkscape.
 *   • NO clip-path — avoids svg2pdf.js rasterisation. Print shops expect
 *     bleed and apply their own die-cutting; the die-lines serve as guides.
 *   • NO vector-effect — svg2pdf.js doesn't support it and falls back
 *     to rasterising the whole group. Stroke widths are pre-scaled instead.
 *
 * Layer order (bottom → top):
 *   1. White page background
 *   2. Template panel fills     (non-decorative white/light paths)
 *   3. User design content      (shapes, images, text — unclipped, individual)
 *   4. Decorative structure     (black corner/flap paths — always visible)
 *   5. Die-line outlines        (vector strokes — all template paths)
 * ──────────────────────────────────────────────────────────────────────────────
 */

// A4 Landscape in points (1pt = 1/72 inch)
const DESIGN_WIDTH  = 841.89;
const DESIGN_HEIGHT = 595.28;

/** Escape XML special characters for text content. */
function escapeXml(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&apos;');
}

/**
 * Build an SVG `transform="…"` attribute from a Konva-style object.
 * Order matches Konva: translate → rotate → scale
 */
function buildTransform(obj) {
  const x  = obj.x  || 0;
  const y  = obj.y  || 0;
  const sx = obj.scaleX || 1;
  const sy = obj.scaleY || 1;
  const r  = obj.rotation || 0;

  if (r === 0 && sx === 1 && sy === 1 && x === 0 && y === 0) return '';

  let t = `translate(${x}, ${y})`;
  if (r !== 0)              t += ` rotate(${r})`;
  if (sx !== 1 || sy !== 1) t += ` scale(${sx}, ${sy})`;
  return `transform="${t}"`;
}

/**
 * Fetch an external image URL and return a base64 data-URI.
 * Falls back to the raw URL when fetch fails (CORS, etc.).
 */
async function toDataURI(url) {
  if (!url || url.startsWith('data:') || url.startsWith('blob:')) return url;
  try {
    const res  = await fetch(url, { mode: 'cors' });
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const r  = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = reject;
      r.readAsDataURL(blob);
    });
  } catch {
    return url;
  }
}

/**
 * Main export — returns the design as a self-contained SVG Blob.
 *
 * @param {Array} objects — canvas objects array from the Zustand store
 * @returns {Promise<Blob>}
 */
export async function exportStageAsSVG(objects) {
  const W = DESIGN_WIDTH;
  const H = DESIGN_HEIGHT;

  // Categorise objects
  const svgPaths  = objects.filter(o => o.type === 'svg-path');
  const bgPaths   = svgPaths.filter(o => !o.isDecorative);   // white/light panel fills
  const decoPaths = svgPaths.filter(o =>  o.isDecorative);   // black structural fills
  const images    = objects.filter(o => o.type === 'image');
  const texts     = objects.filter(o => o.type === 'text');
  const shapes    = objects.filter(o => o.type === 'shape');

  // Resolve every image to a base64 data-URI so the SVG is portable
  const imgMap = {};
  await Promise.all(
    images.map(async (obj) => { imgMap[obj.id] = await toDataURI(obj.src); })
  );

  let svg = '';

  // ── SVG Header ──────────────────────────────────────────────────────────────
  svg += `<?xml version="1.0" encoding="UTF-8"?>\n`;
  svg += `<svg\n`;
  svg += `  xmlns="http://www.w3.org/2000/svg"\n`;
  svg += `  xmlns:xlink="http://www.w3.org/1999/xlink"\n`;
  svg += `  width="${W}" height="${H}"\n`;
  svg += `  viewBox="0 0 ${W} ${H}"\n`;
  svg += `  version="1.1">\n`;

  // ── Layer 1 — Page background ───────────────────────────────────────────────
  svg += `  <rect id="page-bg" width="${W}" height="${H}" fill="white"/>\n`;

  // ── Layer 2 — Template panel fills (individual selectable paths) ─────────
  if (bgPaths.length > 0) {
    svg += `  <g id="Template-Fills">\n`;
    for (const obj of bgPaths) {
      const t    = buildTransform(obj);
      const fill = obj.fill || '#FEFEFE';
      svg += `    <path d="${obj.data}" fill="${fill}" stroke="none" ${t}/>\n`;
    }
    svg += `  </g>\n`;
  }

  // ── Layer 3 — User design content (NO clip-path — individual objects) ────
  // Each element is a standalone vector/image that CorelDRAW can select.

  if (shapes.length > 0) {
    svg += `  <g id="User-Shapes">\n`;
    for (const obj of shapes) {
      const t    = buildTransform(obj);
      const fill = obj.fill || '#4F46E5';
      svg += `    <path d="${obj.data}" fill="${fill}" stroke="none" ${t}/>\n`;
    }
    svg += `  </g>\n`;
  }

  if (images.length > 0) {
    svg += `  <g id="User-Images">\n`;
    for (const obj of images) {
      const t    = buildTransform(obj);
      const href = imgMap[obj.id] || obj.src || '';
      svg += `    <image xlink:href="${href}"`;
      svg += ` x="0" y="0"`;
      svg += ` width="${obj.width || 250}" height="${obj.height || 250}"`;
      svg += ` preserveAspectRatio="xMidYMid meet"`;
      if (t) svg += ` ${t}`;
      svg += `/>\n`;
    }
    svg += `  </g>\n`;
  }

  if (texts.length > 0) {
    svg += `  <g id="User-Text">\n`;
    for (const obj of texts) {
      const fontSize   = obj.fontSize   || 24;
      const fontFamily = (obj.fontFamily || 'sans-serif').replace(/'/g, '');
      const fontWeight = obj.fontWeight  || 400;
      const fill       = obj.fill       || '#000000';
      const x  = obj.x  || 0;
      const y  = obj.y  || 0;
      const r  = obj.rotation || 0;
      const sx = obj.scaleX   || 1;
      const sy = obj.scaleY   || 1;

      let tf = `translate(${x}, ${y})`;
      if (r  !== 0)              tf += ` rotate(${r})`;
      if (sx !== 1 || sy !== 1)  tf += ` scale(${sx}, ${sy})`;

      const lines = (obj.text || '').split('\n');
      svg += `    <text font-size="${fontSize}" font-family="${escapeXml(fontFamily)}"`;
      svg += ` font-weight="${fontWeight}" fill="${fill}" transform="${tf}">\n`;
      lines.forEach((line, i) => {
        svg += `      <tspan x="0" dy="${i === 0 ? fontSize : fontSize * 1.2}">${escapeXml(line)}</tspan>\n`;
      });
      svg += `    </text>\n`;
    }
    svg += `  </g>\n`;
  }

  // ── Layer 4 — Decorative structure (black corner/flap fills) ────────────
  if (decoPaths.length > 0) {
    svg += `  <g id="Decorative-Fills">\n`;
    for (const obj of decoPaths) {
      const t    = buildTransform(obj);
      const fill = obj.fill || '#2B2A29';
      svg += `    <path d="${obj.data}" fill="${fill}" stroke="none" ${t}/>\n`;
    }
    svg += `  </g>\n`;
  }

  // ── Layer 5 — Die-line outlines (vector strokes for cut/crease guides) ──
  // Stroke widths are in the ORIGINAL SVG coordinate space and are scaled
  // down by the path transform, so they render at the correct visual weight.
  // We do NOT use vector-effect="non-scaling-stroke" because svg2pdf.js
  // doesn't support it and falls back to full rasterisation.
  if (svgPaths.length > 0) {
    svg += `  <g id="Die-Lines">\n`;
    for (const obj of svgPaths) {
      const t           = buildTransform(obj);
      const stroke      = obj.stroke      || '#2B2A29';
      const strokeWidth = obj.strokeWidth  || 200;
      svg += `    <path d="${obj.data}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" ${t}/>\n`;
    }
    svg += `  </g>\n`;
  }

  svg += `</svg>\n`;

  return new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
}
