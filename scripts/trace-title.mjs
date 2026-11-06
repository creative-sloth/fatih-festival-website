// Traces the hero title lettering from the flyer into clean vector paths.
//   node scripts/trace-title.mjs            -> writes components/titleArt.generated.ts
//   node scripts/trace-title.mjs --debug    -> also writes debug PNGs next to this file's temp dir (arg: dir)
// Why: live text + CSS effects rendered as a black mass / stair-steps in some browsers. This turns the flyer
// lettering into geometry (face, outline and extrusion are all real paths), so every browser draws the same thing.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'public/assets/poster-fatih-festival-3.0.jpg';
const S = 4; // upscale factor: 1 unit = 1/4 flyer pixel
const L = 180, T = 110, W = 760, H = 385; // crop in flyer px (includes the top of the tagline; we drop those loops)
const OUT = 'components/titleArt.generated.ts';
const debugDir = process.argv.includes('--debug') ? process.argv[process.argv.indexOf('--debug') + 1] : null;

const w = W * S, h = H * S;

// ---------- 1. face mask (yellow / orange / red, not teal, not black) ----------
const { data: rgb } = await sharp(SRC)
  .extract({ left: L, top: T, width: W, height: H })
  .resize({ width: w, height: h, kernel: 'lanczos3' })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const mask = new Uint8Array(w * h);
for (let i = 0; i < w * h; i++) {
  const r = rgb[i * 3], g = rgb[i * 3 + 1], b = rgb[i * 3 + 2];
  if (r > 175 && b < 0.75 * r && r - b > 55 && r >= g - 4) mask[i] = 255;
}
// drop tiny specks before contouring is handled by area filtering below
const blurred = await sharp(Buffer.from(mask), { raw: { width: w, height: h, channels: 1 } }).blur(3).extractChannel(0).raw().toBuffer();

// ---------- 2. marching squares ----------
function contour(field, fw, fh, level = 127.5) {
  const segs = [];
  const pt = (id) => {
    const horiz = id % 2 === 0;
    const cell = (id - (horiz ? 0 : 1)) / 2;
    const x = cell % fw, y = (cell - x) / fw;
    if (horiz) {
      const a = field[y * fw + x], b = field[y * fw + x + 1];
      return [x + (level - a) / (b - a), y];
    }
    const a = field[y * fw + x], b = field[(y + 1) * fw + x];
    return [x, y + (level - a) / (b - a)];
  };
  const H_ = (x, y) => 2 * (y * fw + x), V_ = (x, y) => 2 * (y * fw + x) + 1;
  for (let y = 0; y < fh - 1; y++) {
    for (let x = 0; x < fw - 1; x++) {
      const a = field[y * fw + x] >= level, b = field[y * fw + x + 1] >= level;
      const c = field[(y + 1) * fw + x + 1] >= level, d = field[(y + 1) * fw + x] >= level;
      const k = (a ? 1 : 0) | (b ? 2 : 0) | (c ? 4 : 0) | (d ? 8 : 0);
      if (k === 0 || k === 15) continue;
      const top = H_(x, y), bot = H_(x, y + 1), left = V_(x, y), right = V_(x + 1, y);
      const add = (p, q) => segs.push([p, q]);
      switch (k) {
        case 1: case 14: add(left, top); break;
        case 2: case 13: add(top, right); break;
        case 3: case 12: add(left, right); break;
        case 4: case 11: add(right, bot); break;
        case 5: add(left, top); add(right, bot); break;
        case 6: case 9: add(top, bot); break;
        case 7: case 8: add(left, bot); break;
        case 10: add(top, right); add(left, bot); break;
      }
    }
  }
  const byEdge = new Map();
  segs.forEach((s, i) => s.forEach((e) => (byEdge.has(e) ? byEdge.get(e).push(i) : byEdge.set(e, [i]))));
  const used = new Uint8Array(segs.length);
  const loops = [];
  for (let i = 0; i < segs.length; i++) {
    if (used[i]) continue;
    used[i] = 1;
    const ids = [segs[i][0], segs[i][1]];
    let cur = segs[i][1];
    for (;;) {
      const next = (byEdge.get(cur) || []).find((j) => !used[j]);
      if (next === undefined) break;
      used[next] = 1;
      cur = segs[next][0] === cur ? segs[next][1] : segs[next][0];
      ids.push(cur);
    }
    if (ids.length > 8) loops.push(ids.map(pt));
  }
  return loops;
}

const area = (p) => {
  let s = 0;
  for (let i = 0; i < p.length; i++) {
    const [x1, y1] = p[i], [x2, y2] = p[(i + 1) % p.length];
    s += x1 * y2 - x2 * y1;
  }
  return s / 2;
};
const inside = (pt, poly) => {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
};
function simplify(p, eps) {
  // closed-polygon Douglas-Peucker: split at the two farthest points
  const n = p.length;
  let a = 0, b = 0, best = -1;
  for (let i = 0; i < n; i += Math.max(1, n >> 6)) {
    const d = (p[i][0] - p[0][0]) ** 2 + (p[i][1] - p[0][1]) ** 2;
    if (d > best) ((best = d), (b = i));
  }
  const rec = (pts) => {
    if (pts.length < 3) return pts;
    const [x1, y1] = pts[0], [x2, y2] = pts[pts.length - 1];
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
    let md = 0, mi = 0;
    for (let i = 1; i < pts.length - 1; i++) {
      const d = Math.abs(dy * (pts[i][0] - x1) - dx * (pts[i][1] - y1)) / len;
      if (d > md) ((md = d), (mi = i));
    }
    if (md <= eps) return [pts[0], pts[pts.length - 1]];
    return [...rec(pts.slice(0, mi + 1)).slice(0, -1), ...rec(pts.slice(mi))];
  };
  const first = p.slice(a, b + 1), second = [...p.slice(b), ...p.slice(0, a + 1)];
  return [...rec(first).slice(0, -1), ...rec(second).slice(0, -1)];
}
const toPath = (loops) =>
  loops.map((p) => 'M' + p.map(([x, y]) => `${Math.round(x)} ${Math.round(y)}`).join('L') + 'Z').join('');

// ---------- 3. loops -> letters (outer loop + its real counters) ----------
// Flyer sparkle positions (flyer px, absolute) so we can ignore the white "holes" they punch into faces.
const SPARKLES = [
  [380, 175], [662, 165], [562, 288], [317, 405], [485, 440], [815, 340], [852, 435],
].map(([x, y]) => [(x - L) * S, (y - T) * S]);
// (refined below after viewing; sparkle centres in flyer px)
const sparkleNear = (poly) => {
  const cx = poly.reduce((s, p) => s + p[0], 0) / poly.length, cy = poly.reduce((s, p) => s + p[1], 0) / poly.length;
  return SPARKLES.some(([sx, sy]) => Math.hypot(cx - sx, cy - sy) < 90);
};

const raw = contour(blurred, w, h);
console.log('raw loops', raw.length, raw.slice(0, 8).map((p) => p.length + ':' + Math.round(area(p))).join(' '));
let loops = raw.map((p) => simplify(p, 2.2));
loops = loops.filter((p) => Math.abs(area(p)) > 150);
loops.sort((a, b) => Math.abs(area(b)) - Math.abs(area(a)));
const outers = [], holes = [];
for (const p of loops) {
  const depth = outers.filter((o) => inside(p[0], o.poly)).length;
  if (depth % 2 === 0) outers.push({ poly: p, holes: [] });
  else holes.push(p);
}
for (const hp of holes) {
  const o = outers.find((o) => inside(hp[0], o.poly));
  if (o && !sparkleNear(hp) && Math.abs(area(hp)) > 2500) o.holes.push(hp);
}
const bbox = (p) => {
  const xs = p.map((q) => q[0]), ys = p.map((q) => q[1]);
  return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) };
};
const letters = outers
  .map((o) => ({ ...o, box: bbox(o.poly), a: Math.abs(area(o.poly)) }))
  .filter((o) => o.a > 4000)
  // drop the flyer's lightning bolts, the logo scrap top-right and the tagline letters
  .filter((o) => !(o.box.x0 > 2600 && o.box.y1 < 800))
  .filter((o) => !(o.box.x1 < 340 && o.box.y0 < 600))
  .filter((o) => o.box.y0 < 1330);

// ---------- 3b. the tagline hides the bottom of the "0" and the "." in the flyer: complete them as ellipses ----------
function solve(M, v) {
  const n = v.length;
  const A = M.map((r, i) => [...r, v[i]]);
  for (let i = 0; i < n; i++) {
    let p = i;
    for (let r = i + 1; r < n; r++) if (Math.abs(A[r][i]) > Math.abs(A[p][i])) p = r;
    [A[i], A[p]] = [A[p], A[i]];
    for (let r = 0; r < n; r++) {
      if (r === i) continue;
      const f = A[r][i] / A[i][i];
      for (let c = i; c <= n; c++) A[r][c] -= f * A[i][c];
    }
  }
  return A.map((r, i) => r[n] / r[i]);
}
// least-squares conic  A x² + B xy + C y² + D x + E y = 1, then sampled as a polygon
function ellipseFrom(raw, steps = 120) {
  // normalise for conditioning: centre on the mean, scale to ~1
  const mx = raw.reduce((s, p) => s + p[0], 0) / raw.length, my = raw.reduce((s, p) => s + p[1], 0) / raw.length;
  const sc = 400;
  const points = raw.map(([x, y]) => [(x - mx) / sc, (y - my) / sc]);
  const rows = points.map(([x, y]) => [x * x, x * y, y * y, x, y]);
  const M = Array.from({ length: 5 }, (_, i) => Array.from({ length: 5 }, (_, j) => rows.reduce((s, r) => s + r[i] * r[j], 0)));
  const v = Array.from({ length: 5 }, (_, i) => rows.reduce((s, r) => s + r[i], 0));
  const [A, B, C, D, E] = solve(M, v);
  const [cx, cy] = solve([[2 * A, B], [B, 2 * C]], [-D, -E]);
  // shift to centre: A x'² + B x'y' + C y'² = k
  const k = 1 + A * cx * cx + B * cx * cy + C * cy * cy + D * cx + E * cy;
  const out = [];
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2, c = Math.cos(t), sn = Math.sin(t);
    const q = A * c * c + B * c * sn + C * sn * sn;
    const r = Math.sqrt(k / q);
    out.push([mx + (cx + r * c) * sc, my + (cy + r * sn) * sc]);
  }
  return out;
}
function hull(points) {
  const p = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [], up = [];
  for (const q of p) { while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  for (const q of [...p].reverse()) { while (up.length >= 2 && cross(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
  return [...lo.slice(0, -1), ...up.slice(0, -1)];
}
const zero = letters.find((o) => o.box.x0 > 2300 && o.box.x1 > 2600 && o.box.y1 > 1400);
const dot = letters.find((o) => o.box.x0 > 2100 && o.box.x1 < 2400 && o.box.y1 < 1400 && o.box.y0 > 1200);
if (zero && zero.holes[0]) {
  // An ellipse is centrally symmetric about its counter's centre: keep the visible upper arc, mirror it through that centre.
  const hc = zero.holes[0];
  const cx = hc.reduce((t, p) => t + p[0], 0) / hc.length, cy = hc.reduce((t, p) => t + p[1], 0) / hc.length;
  const pts = zero.poly;
  const start = pts.findIndex(([, y]) => y >= cy);
  const rot = [...pts.slice(start), ...pts.slice(0, start)];
  // contiguous run with y < cy (upper arc), starting at the first point that goes above the line
  const k0 = rot.findIndex(([, y]) => y < cy);
  const run = [];
  for (let i = k0; i < rot.length && rot[i][1] < cy; i++) run.push(rot[i]);
  // convex hull removes the sparkle bite (and its mirror image): the real shape is an ellipse
  zero.poly = hull([...run, ...run.map(([x, y]) => [2 * cx - x, 2 * cy - y])]);
  zero.box = bbox(zero.poly);
  zero.a = Math.abs(area(zero.poly));
}
if (dot) {
  // circle fit (the tagline hides its lower half): x²+y²+Dx+Ey+F=0
  const pts = dot.poly.filter(([, y]) => y < dot.box.y1 - 6);
  const M = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], v = [0, 0, 0];
  for (const [x, y] of pts) {
    const r = [x, y, 1], b = -(x * x + y * y);
    for (let i = 0; i < 3; i++) { for (let j = 0; j < 3; j++) M[i][j] += r[i] * r[j]; v[i] += r[i] * b; }
  }
  const [D, E, F] = solve(M, v);
  const cx = -D / 2, cy = -E / 2, rad = Math.sqrt(cx * cx + cy * cy - F);
  dot.poly = Array.from({ length: 64 }, (_, i) => [cx + rad * Math.cos((i / 64) * Math.PI * 2), cy + rad * Math.sin((i / 64) * Math.PI * 2)]);
  dot.box = bbox(dot.poly);
  dot.a = Math.abs(area(dot.poly));
}

if (debugDir) {
  fs.mkdirSync(debugDir, { recursive: true });
  const dbg = letters
    .map((o, i) => {
      const bx = o.box;
      return `<path d="${toPath([o.poly, ...o.holes])}" fill="rgba(0,160,255,.35)" stroke="blue" stroke-width="3" fill-rule="evenodd"/><text x="${(bx.x0 + bx.x1) / 2}" y="${(bx.y0 + bx.y1) / 2}" font-size="80" fill="black">${i}</text>`;
    })
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${dbg}${SPARKLES.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="20" fill="red"/>`).join('')}</svg>`;
  const base = await sharp(SRC).extract({ left: L, top: T, width: W, height: H }).resize({ width: w }).toBuffer();
  const over = await sharp(Buffer.from(svg)).resize({ width: w, height: h }).png().toBuffer();
  const comp = await sharp(base).composite([{ input: over }]).png().toBuffer();
  await sharp(comp).resize({ width: 1520 }).png().toFile(path.join(debugDir, 'faces.png'));
}

console.log('letters found:', letters.length);
letters.forEach((o, i) => console.log(i, JSON.stringify(o.box, (k, v) => (typeof v === 'number' ? Math.round(v) : v)), Math.round(o.a), 'holes', o.holes.length));

// separable box dilate/erode on a 0/255 raster (sliding window counts, O(n))
function box(src, fw, fh, r, erode) {
  const tmp = new Uint8Array(fw * fh), out = new Uint8Array(fw * fh);
  const win = 2 * r + 1;
  for (let y = 0; y < fh; y++) {
    let c = 0;
    for (let x = -r; x < fw + r; x++) {
      if (x + r < fw) c += src[y * fw + x + r] ? 1 : 0;
      if (x - r - 1 >= 0) c -= src[y * fw + x - r - 1] ? 1 : 0;
      if (x >= 0 && x < fw) tmp[y * fw + x] = (erode ? c === win : c > 0) ? 255 : 0;
    }
  }
  for (let x = 0; x < fw; x++) {
    let c = 0;
    for (let y = -r; y < fh + r; y++) {
      if (y + r < fh) c += tmp[(y + r) * fw + x] ? 1 : 0;
      if (y - r - 1 >= 0) c -= tmp[(y - r - 1) * fw + x] ? 1 : 0;
      if (y >= 0 && y < fh) out[y * fw + x] = (erode ? c === win : c > 0) ? 255 : 0;
    }
  }
  return out;
}

// ---------- 4. outline + extrusion ("mass"), per letter, from a raster sweep of the face ----------
// Fitted against the flyer (IoU search over direction and outline radius, see commit message).
const EXT = { ch1: [70, 0], ch2: [40, 15], num: [40, 15] }; // flyer px
const OUTLINE = 9; // flyer px
const group = (l) => (l.box.y1 < 1000 ? 'ch1' : l.box.x0 < 1900 ? 'ch2' : 'num');
letters.sort((a, b) => ['ch1', 'ch2', 'num'].indexOf(group(a)) - ['ch1', 'ch2', 'num'].indexOf(group(b)) || a.box.x0 - b.box.x0);

const PAD = 420, MS = 2; // mass raster: 1 px = 2 units, padded
const mw = Math.ceil((w + 2 * PAD) / MS), mh = Math.ceil((h + 2 * PAD) / MS);
const dpath = (loops) => loops.map((p) => 'M' + p.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L') + 'Z').join('');
for (const l of letters) {
  l.group = group(l);
  const [dx, dy] = EXT[l.group];
  const n = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 1.5));
  const d = dpath([l.poly, ...l.holes]);
  let body = '';
  for (let k = 0; k <= n; k++)
    body += `<path d="${d}" transform="translate(${(dx * S * k) / n + PAD} ${(dy * S * k) / n + PAD})" fill="#fff" stroke="#fff" stroke-width="${OUTLINE * 2 * S}" stroke-linejoin="round" fill-rule="evenodd"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${mw}" height="${mh}" viewBox="0 0 ${mw * MS} ${mh * MS}"><rect width="100%" height="100%" fill="#000"/>${body}</svg>`;
  let field = await sharp(Buffer.from(svg)).removeAlpha().extractChannel(0).raw().toBuffer();
  if (l.box.x0 > 1800 && l.box.x1 < 2300 && l.box.y1 > 1300) {
    // the "3" is open on its left: close the notch so no background shows between it and the "L"
    const R = Math.round((44 * S) / MS);
    field = box(box(field, mw, mh, R, false), mw, mh, R, true);
  }
  field = await sharp(Buffer.from(field), { raw: { width: mw, height: mh, channels: 1 } }).blur(1.2).extractChannel(0).raw().toBuffer();
  const loopsM = contour(field, mw, mh).map((p) => simplify(p.map(([x, y]) => [x * MS - PAD, y * MS - PAD]), 2)).filter((p) => Math.abs(area(p)) > 4000);
  loopsM.sort((a, b) => Math.abs(area(b)) - Math.abs(area(a)));
  // mass is a solid silhouette: keep the largest loop and any loop that is not a hole of it (counters stay open: they are real)
  // solid silhouette: outer loops only (the face's own counters stay open on top; gaps between letters fill with ink)
  l.mass = loopsM.filter((p, i) => loopsM.slice(0, i).filter((o) => inside(p[0], o)).length % 2 === 0);
}

// ---------- 5. emit ----------
const rel = (loops) =>
  loops
    .map((p) => {
      const q = p.map(([x, y]) => [Math.round(x), Math.round(y)]);
      let out = `M${q[0][0]} ${q[0][1]}`;
      for (let i = 1; i < q.length; i++) out += `l${q[i][0] - q[i - 1][0]} ${q[i][1] - q[i - 1][1]}`;
      return out + 'z';
    })
    .join('');
let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
for (const l of letters) for (const p of l.mass) for (const [x, y] of p) ((x0 = Math.min(x0, x)), (x1 = Math.max(x1, x)), (y0 = Math.min(y0, y)), (y1 = Math.max(y1, y)));
const MARGIN = 20;
x0 = Math.floor(x0 - MARGIN); y0 = Math.floor(y0 - MARGIN); x1 = Math.ceil(x1 + MARGIN); y1 = Math.ceil(y1 + MARGIN);
const spark = SPARKLES.map(([x, y], i) => ({ x: Math.round(x), y: Math.round(y), r: i === 4 || i === 6 ? 40 : 56 }));
const rangeOf = (g) => {
  const ls = letters.filter((l) => l.group === g);
  return [Math.round(Math.min(...ls.map((l) => l.box.y0))), Math.round(Math.max(...ls.map((l) => l.box.y1)))];
};
const art = {
  viewBox: [x0, y0, x1 - x0, y1 - y0],
  gradient: { ch1: rangeOf('ch1'), ch2: rangeOf('ch2'), num: rangeOf('num') },
  letters: letters.map((l, i) => ({
    id: i,
    group: l.group,
    ox: Math.round((l.box.x0 + l.box.x1) / 2),
    oy: Math.round(l.box.y0 + (l.box.y1 - l.box.y0) * 0.85),
    face: rel([l.poly, ...l.holes]),
    mass: rel(l.mass),
  })),
  sparkles: spark,
};
fs.writeFileSync(
  OUT,
  `// GENERATED by scripts/trace-title.mjs from public/assets/poster-fatih-festival-3.0.jpg. Do not edit by hand.
// Units are quarter flyer pixels. Face = letter shape, mass = outline + extrusion silhouette.
export const titleArt = ${JSON.stringify(art)} as const;
`,
);
console.log('wrote', OUT, Math.round(fs.statSync(OUT).size / 1024) + ' KB', 'viewBox', art.viewBox.join(' '));

// ---------- 6. static asset (also the no-JS / social fallback): public/assets/title.svg + PNG/WebP at 2x and 3x ----------
const STOPS = [['0', '#ffe347'], ['.38', '#ffb300'], ['.7', '#ff6a1a'], ['1', '#e3261c']];
const grad = (id, [a, b]) =>
  `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${a}" x2="0" y2="${b}">${STOPS.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const sparkPath = (x, y, r) => `M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z`;
const svgDoc =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${art.viewBox.join(' ')}" width="${art.viewBox[2] / 4}" height="${art.viewBox[3] / 4}" role="img" aria-label="Fatih Festival 3.0"><defs>` +
  ['ch1', 'ch2', 'num'].map((g) => grad('g-' + g, art.gradient[g])).join('') +
  `<pattern id="dots" width="34" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(-4)"><circle cx="8.5" cy="8.5" r="5.5" fill="#e8460f" fill-opacity=".55"/><circle cx="25.5" cy="25.5" r="5.5" fill="#e8460f" fill-opacity=".55"/></pattern></defs>` +
  art.letters.map((l) => `<path d="${l.mass}" fill="#111014" fill-rule="evenodd"/>`).join('') +
  art.letters.map((l) => `<path d="${l.face}" fill="url(#g-${l.group})" fill-rule="evenodd"/><path d="${l.face}" fill="url(#dots)" fill-rule="evenodd"/>`).join('') +
  art.sparkles.map((k) => `<path d="${sparkPath(k.x, k.y, k.r)}" fill="#fff"/>`).join('') +
  '</svg>';
fs.writeFileSync('public/assets/title.svg', svgDoc);
for (const [k, wpx] of [[2, 1400], [3, 2100]]) {
  await sharp(Buffer.from(svgDoc), { density: 300 }).resize({ width: wpx }).png().toFile(`public/assets/title@${k}x.png`);
  await sharp(Buffer.from(svgDoc), { density: 300 }).resize({ width: wpx }).webp({ quality: 90 }).toFile(`public/assets/title@${k}x.webp`);
}
console.log('wrote public/assets/title.svg and PNG/WebP @2x @3x');
