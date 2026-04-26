// Colours that indicate a "decorative / structural" zone — black corner flaps, etc.
// These paths must render on top of user content and must not be selectable.
const DECORATIVE_FILLS = new Set([
  '#2b2a29', '#2B2A29',
  '#000000', '#000',
  '#1a1a1a', '#111111',
]);

/** Returns true when a hex colour string is a "near-black" decorative fill. */
function isDecorativeFill(fill) {
  if (!fill || fill === 'transparent' || fill === 'none') return false;
  return DECORATIVE_FILLS.has(fill.trim());
}

/** 
 * Simple heuristic to estimate path area via bounding box.
 * Helps distinguish between small flaps and large background areas.
 */
function getPathStats(data, svgWidth, svgHeight) {
  const numbers = (data || "").match(/-?\d+\.?\d*/g);
  if (!numbers || numbers.length < 2) return { areaRatio: 0 };
  
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0; i < numbers.length; i += 2) {
    const x = parseFloat(numbers[i]);
    const y = parseFloat(numbers[i+1]);
    if (isNaN(x) || isNaN(y)) continue;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
  
  const width = maxX - minX;
  const height = maxY - minY;
  const area = width * height;
  const svgArea = svgWidth * svgHeight;
  
  return {
    areaRatio: area / (svgArea || 1),
    width,
    height
  };
}

export const parseSvgContent = (svgContent) => {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
  const paths = svgDoc.querySelectorAll('polygon, path');
  const parsedPaths = [];
  let width = 800;
  let height = 600;

  if (svgDoc.documentElement) {
    const viewBox = svgDoc.documentElement.getAttribute('viewBox');
    if (viewBox) {
      const parts = viewBox.trim().split(/[\s,]+/);
      if (parts.length === 4) {
        width = parseFloat(parts[2]);
        height = parseFloat(parts[3]);
      }
    } else {
      width = parseFloat(svgDoc.documentElement.getAttribute('width')) || 800;
      height = parseFloat(svgDoc.documentElement.getAttribute('height')) || 600;
    }
  }

  // ── Extract CSS class → fill/stroke from embedded <style> CDATA blocks ──────
  const classFillMap   = {};
  const classStrokeMap = {};

  svgDoc.querySelectorAll('style').forEach((styleEl) => {
    const cssText = styleEl.textContent || '';
    const ruleRegex = /\.([\w-]+)\s*\{([^}]*)\}/g;
    let match;
    while ((match = ruleRegex.exec(cssText)) !== null) {
      const cls   = match[1];
      const decls = match[2];

      const fillMatch = decls.match(/(?:^|;)\s*fill\s*:\s*([^;}\s]+)/);
      if (fillMatch) {
        const val = fillMatch[1].trim();
        classFillMap[cls] = (val === 'none') ? 'transparent' : val;
      }

      const strokeMatch = decls.match(/(?:^|;)\s*stroke\s*:\s*([^;}\s]+)/);
      if (strokeMatch) {
        classStrokeMap[cls] = strokeMatch[1].trim();
      }
    }
  });

  const resolveFill = (el) => {
    const inlineFill = el.getAttribute('fill') || el.style.fill;
    if (inlineFill) return inlineFill === 'none' ? 'transparent' : inlineFill;

    const classes = (el.getAttribute('class') || '').split(/\s+/);
    for (const cls of classes) {
      if (cls && classFillMap[cls] !== undefined) return classFillMap[cls];
    }

    if (classes.includes('fil0')) return 'transparent';
    return '#FEFEFE';
  };

  const resolveStroke = (el) => {
    const inlineStroke = el.getAttribute('stroke') || el.style.stroke;
    if (inlineStroke) return inlineStroke;

    const classes = (el.getAttribute('class') || '').split(/\s+/);
    for (const cls of classes) {
      if (cls && classStrokeMap[cls] !== undefined) return classStrokeMap[cls];
    }
    return '#2B2A29';
  };

  paths.forEach((pathEl, index) => {
    let data = pathEl.getAttribute('points') || pathEl.getAttribute('d');
    if (!data) return;

    if (pathEl.tagName.toLowerCase() === 'polygon') {
      const pts = data.trim().split(/[\s,]+/);
      const formattedPts = [];
      for (let i = 0; i < pts.length; i += 2) {
        if (pts[i] !== '' && pts[i + 1] !== undefined) {
          formattedPts.push(pts[i] + ' ' + pts[i + 1]);
        }
      }
      if (formattedPts.length > 0) {
        data = 'M ' + formattedPts[0] + ' L ' + formattedPts.slice(1).join(' L ') + ' Z';
      }
    }

    const fill        = resolveFill(pathEl);
    const stroke      = resolveStroke(pathEl);
    const strokeWidth = parseFloat(
      pathEl.getAttribute('stroke-width') || pathEl.style.strokeWidth || '200'
    );

    const stats = getPathStats(data, width, height);
    
    // isDecorative = true means this path is a structural black zone (corner flaps, etc.)
    // We only treat dark paths as decorative if they are small (e.g. < 40% of SVG area)
    // Large dark paths are treated as backgrounds (isBackground).
    const isDark = isDecorativeFill(fill);
    const isDecorative = isDark && stats.areaRatio < 0.4;
    const isBackground = isDark && stats.areaRatio >= 0.4;

    parsedPaths.push({
      id: `path-${index}`,
      type: 'svg-path',
      data,
      isPolygon: pathEl.tagName.toLowerCase() === 'polygon',
      fill,
      stroke,
      strokeWidth,
      isDecorative,
      isBackground, // New flag
    });
  });

  return { paths: parsedPaths, width, height };
};

export const parseFoodBoxSvg = parseSvgContent;

export const getFoodBoxSvgSrc = () => {
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 299941.4 299941.4" width="800" height="800">
 <polygon points="..." fill="#FEFEFE" stroke="#2B2A29" stroke-width="200"/>
</svg>`;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgContent)));
};
