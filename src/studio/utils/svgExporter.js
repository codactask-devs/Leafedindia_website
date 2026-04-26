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
/**
 * Detects if a canvas contains any transparent pixels.
 */
function hasAlpha(canvas) {
  const ctx = canvas.getContext('2d');
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 255) return true;
  }
  return false;
}

/**
 * Fetch an external image URL and return an optimized base64 data-URI.
 * Downscales large images to keep the final PDF size manageable.
 */
async function toDataURI(url, maxResolution = 1800) {
  if (!url) return '';
  if (url.startsWith('data:')) return url;
  
  try {
    const res = await fetch(url, { mode: 'cors' });
    if (!res.ok) throw new Error('Fetch failed');
    const blob = await res.blob();
    
    // If it's a small file, just encode it directly
    if (blob.size < 150000) {
      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    }

    // Otherwise, downscale via Canvas
    return await new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > maxResolution || h > maxResolution) {
          const ratio = maxResolution / Math.max(w, h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }
        
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        
        // JPEG is significantly smaller than PNG. We only use PNG if 
        // transparency is actually present (common in logos, rare in photos).
        if (hasAlpha(canvas)) {
          resolve(canvas.toDataURL('image/png'));
        } else {
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        }
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        reject();
      };
      img.src = URL.createObjectURL(blob);
    });
  } catch (err) {
    console.warn("toDataURI fallback:", err);
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
  const svgPaths      = objects.filter(o => o.type === 'svg-path');
  const bgDecorPaths  = svgPaths.filter(o => o.isBackground);    // large dark paths
  const bgPaths       = svgPaths.filter(o => 
    !o.isDecorative && 
    !o.isBackground && 
    o.fill !== 'transparent' && 
    o.fill !== 'none'
  ); // white/light printable paths
  const decoPaths     = svgPaths.filter(o => o.isDecorative);    // small dark structural paths
  const images        = objects.filter(o => o.type === 'image');
  const texts         = objects.filter(o => o.type === 'text');
  const shapes        = objects.filter(o => o.type === 'shape');

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

  // ── Clipping Definition ───────────────────────────────────────────────────
  // We define the mask at the top so it can be referenced by subsequent groups.
  const clipVisiblePaths = [...bgPaths];
  if (clipVisiblePaths.length > 0) {
    svg += `  <defs>\n`;
    svg += `    <clipPath id="template-clip">\n`;
    for (const obj of clipVisiblePaths) {
      const t = buildTransform(obj);
      svg += `      <path d="${obj.data}" ${t}/>\n`;
    }
    svg += `    </clipPath>\n`;
    svg += `  </defs>\n`;
  }

  // ── Layer 1 — Page background & structural background ───────────────────────
  svg += `  <rect id="page-bg" width="${W}" height="${H}" fill="white"/>\n`;

  if (bgDecorPaths.length > 0) {
    svg += `  <g id="Background-Decor">\n`;
    for (const obj of bgDecorPaths) {
      const t    = buildTransform(obj);
      const fill = obj.fill || '#2B2A29';
      svg += `    <path d="${obj.data}" fill="${fill}" stroke="none" ${t}/>\n`;
    }
    svg += `  </g>\n`;
  }

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

  // ── Layer 3 — User design content (Clipped to template) ─────────────────
  const clipAttr = clipVisiblePaths.length > 0 ? ' clip-path="url(#template-clip)"' : '';
  svg += `  <g id="User-Content"${clipAttr}>\n`;

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
  
  // Close the clipped User-Content group
  svg += `  </g>\n`;

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
