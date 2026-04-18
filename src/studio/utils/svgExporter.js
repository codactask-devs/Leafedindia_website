/**
 * svgExporter.js
 * Exports the studio canvas objects as a true vector SVG file.
 * The resulting SVG can be opened in CorelDraw, Illustrator, Inkscape, etc.
 * for full vector editing — no rasterization involved.
 */

// Use A4 Landscape dimensions in points (72 DPI)
const DESIGN_WIDTH  = 841.89; 
const DESIGN_HEIGHT = 595.28;

// Escape XML special characters inside text nodes
function escapeXml(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&apos;');
}

/**
 * Build an SVG transform string from a Konva-like object.
 * Konva applies:  translate(x,y)  →  rotate(deg)  →  scale(sx, sy)
 */
function buildTransform(obj) {
  const x  = obj.x  || 0;
  const y  = obj.y  || 0;
  const sx = obj.scaleX || 1;
  const sy = obj.scaleY || 1;
  const r  = obj.rotation || 0;

  if (r === 0 && sx === 1 && sy === 1 && x === 0 && y === 0) return '';

  let t = `translate(${x}, ${y})`;
  if (r !== 0)        t += ` rotate(${r})`;
  if (sx !== 1 || sy !== 1) t += ` scale(${sx}, ${sy})`;
  return `transform="${t}"`;
}

/**
 * Fetch an external image URL and return it as a base64 data-URI.
 * Falls back to the original URL if fetch fails (CORS etc.).
 */
async function toDataURI(url) {
  // Already a data URI or blob URL — use as-is
  if (!url || url.startsWith('data:') || url.startsWith('blob:')) return url;

  try {
    const response = await fetch(url, { mode: 'cors' });
    const blob     = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader  = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return url; // fallback — external URL reference
  }
}

/**
 * Main export function.
 * @param {Array} objects  — array of canvas objects from the Zustand store
 * @returns {Promise<Blob>} — SVG file as a Blob (image/svg+xml)
 */
export async function exportStageAsSVG(objects) {
  const W = DESIGN_WIDTH;
  const H = DESIGN_HEIGHT;

  const svgPaths = objects.filter(o => o.type === 'svg-path');
  const images   = objects.filter(o => o.type === 'image');
  const texts    = objects.filter(o => o.type === 'text');
  const shapes   = objects.filter(o => o.type === 'shape');

  // Pre-fetch all images to base64 so the SVG is self-contained
  const imageDataMap = {};
  await Promise.all(
    images.map(async (obj) => {
      imageDataMap[obj.id] = await toDataURI(obj.src);
    })
  );

  let svg = '';

  // ── Header ─────────────────────────────────────────────────────────────
  svg += `<?xml version="1.0" encoding="UTF-8"?>\n`;
  svg += `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n`;
  svg += `<svg\n`;
  svg += `  xmlns="http://www.w3.org/2000/svg"\n`;
  svg += `  xmlns:xlink="http://www.w3.org/1999/xlink"\n`;
  svg += `  width="${W}" height="${H}"\n`;
  svg += `  viewBox="0 0 ${W} ${H}"\n`;
  svg += `  version="1.1">\n`;

  // ── Clipping Definition ────────────────────────────────────────────────
  svg += `  <defs>\n`;
  svg += `    <clipPath id="templateClip">\n`;
  for (const obj of svgPaths) {
    const t = buildTransform(obj);
    svg += `      <path d="${obj.data}" ${t}/>\n`;
  }
  svg += `    </clipPath>\n`;
  svg += `  </defs>\n`;

  // ── White background ────────────────────────────────────────────────────
  svg += `  <rect width="${W}" height="${H}" fill="white"/>\n`;

  // ── Layer 1: SVG Path Fills (background box shapes) ─────────────────────
  if (svgPaths.length > 0) {
    svg += `  <!-- Background Template Paths -->\n`;
    svg += `  <g id="background-fills">\n`;
    for (const obj of svgPaths) {
      const t    = buildTransform(obj);
      const fill = obj.fill || '#FEFEFE';
      svg += `    <path d="${obj.data}" fill="${fill}" stroke="none" ${t}/>\n`;
    }
    svg += `  </g>\n`;
  }

  // ── BEGIN CLIPPED CONTENT ──────────────────────────────────────────────
  svg += `  <g id="design-content" clip-path="url(#templateClip)">\n`;

  // ── Layer 2: User Shapes ────────────────────────────────────────────────
  if (shapes.length > 0) {
    svg += `    <!-- User Shapes -->\n`;
    svg += `    <g id="user-shapes">\n`;
    for (const obj of shapes) {
      const t    = buildTransform(obj);
      const fill = obj.fill || '#4F46E5';
      svg += `      <path d="${obj.data}" fill="${fill}" stroke="none" ${t}/>\n`;
    }
    svg += `    </g>\n`;
  }

  // ── Layer 3: Clipped Images ─────────────────────────────────────────────
  if (images.length > 0) {
    svg += `    <!-- User Images -->\n`;
    svg += `    <g id="user-images">\n`;
    for (const obj of images) {
      const t    = buildTransform(obj);
      const href = imageDataMap[obj.id] || obj.src || '';
      
      // IMPORTANT: Use x="0" y="0" because the transform translate(x,y) already positions it.
      // This fixes the "double translation" bug.
      svg += `      <image xlink:href="${href}"\n`;
      svg += `        x="0" y="0"\n`;
      svg += `        width="${obj.width || 250}" height="${obj.height || 250}"\n`;
      svg += `        preserveAspectRatio="xMidYMid meet"\n`;
      if (t) svg += `        ${t}\n`;
      svg += `      />\n`;
    }
    svg += `    </g>\n`;
  }

  // ── Layer 4: Text Elements ──────────────────────────────────────────────
  if (texts.length > 0) {
    svg += `    <!-- Text Elements -->\n`;
    svg += `    <g id="user-texts">\n`;
    for (const obj of texts) {
      const fontSize   = obj.fontSize   || 24;
      const fontFamily = (obj.fontFamily || 'sans-serif').replace(/'/g, '');
      const fontWeight = obj.fontWeight || 400;
      const fill       = obj.fill       || '#000000';
      const x          = obj.x          || 0;
      const y          = obj.y          || 0;
      const r          = obj.rotation   || 0;
      const sx         = obj.scaleX     || 1;
      const sy         = obj.scaleY     || 1;

      // SVG text baseline is at y; Konva text origin is top-left, so shift by fontSize
      let transformStr = `translate(${x}, ${y})`;
      if (r !== 0)        transformStr += ` rotate(${r})`;
      if (sx !== 1 || sy !== 1) transformStr += ` scale(${sx}, ${sy})`;

      // Handle multiline text
      const lines = (obj.text || '').split('\n');
      svg += `      <text\n`;
      svg += `        font-size="${fontSize}"\n`;
      svg += `        font-family="${escapeXml(fontFamily)}"\n`;
      svg += `        font-weight="${fontWeight}"\n`;
      svg += `        fill="${fill}"\n`;
      svg += `        transform="${transformStr}">\n`;
      lines.forEach((line, i) => {
        svg += `        <tspan x="0" dy="${i === 0 ? fontSize : fontSize * 1.2}">${escapeXml(line)}</tspan>\n`;
      });
      svg += `      </text>\n`;
    }
    svg += `    </g>\n`;
  }

  svg += `  </g><!-- End Clipped Content -->\n`;

  // ── Layer 5: SVG Path Outlines/Strokes on top (keeps borders crisp) ─────
  if (svgPaths.length > 0) {
    svg += `  <!-- Template Outlines (strokes on top) -->\n`;
    svg += `  <g id="foreground-outlines">\n`;
    for (const obj of svgPaths) {
      const t           = buildTransform(obj);
      const stroke      = obj.stroke      || '#2B2A29';
      const strokeWidth = obj.strokeWidth || 200; // matches original SVG scale
      svg += `    <path d="${obj.data}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" vector-effect="non-scaling-stroke" ${t}/>\n`;
    }
    svg += `  </g>\n`;
  }

  svg += `</svg>\n`;

  return new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
}

