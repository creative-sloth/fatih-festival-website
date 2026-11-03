"""Generates the comic background art in public/assets/ (our own procedural drawings, no stock images).

  collage-fill-a.svg / collage-fill-b.svg
                     tilted comic-page panels, each with its own fill (sunburst, graded halftone,
                     speed lines, swirl, focus burst). Alternate panels are split across the two files
                     so CSS can paint them in two colours (masks). Tiles vertically without a seam.
  collage-gutter.svg the cream gutters between those panels (also a mask).
  focus-lines.svg    manga speed-line burst: ink lines rushing toward an empty centre.
  swirl.svg          twisted sunburst arms (mask), for the footer.

Run: python scripts/make-comic-backgrounds.py
"""
import math
import os
import random

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets')
os.makedirs(OUT, exist_ok=True)
rng = random.Random(30)  # fixed seed: the art is the same on every run


def f(v):
    return f'{v:.1f}'.rstrip('0').rstrip('.')


def poly(points, extra=''):
    return '<polygon points="' + ' '.join(f'{f(x)},{f(y)}' for x, y in points) + f'"{extra}/>'


# ---------------------------------------------------------------- pattern painters
def rays(cx, cy, n=32, r=2600, jitter=0.35):
    out = []
    step = 2 * math.pi / n
    for k in range(n):
        a0 = k * step
        w = step * (0.5 + rng.uniform(-jitter, jitter) * 0.5)
        out.append(poly([(cx, cy), (cx + r * math.cos(a0), cy + r * math.sin(a0)), (cx + r * math.cos(a0 + w), cy + r * math.sin(a0 + w))]))
    return ''.join(out)


def halftone(x0, y0, x1, y1, gx, gy, step=30, max_r=14.5):
    out = []
    span = math.hypot(x1 - x0, y1 - y0)
    row = 0
    y = y0
    while y < y1:
        x = x0 + (step / 2 if row % 2 else 0)
        while x < x1:
            t = math.hypot(x - gx, y - gy) / span
            r = max_r * max(0.0, 1 - t * 1.1) ** 1.2
            if r > 0.6:
                out.append(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}"/>')
            x += step
        y += step * 0.866
        row += 1
    return ''.join(out)


def speed_lines(x0, y0, x1, y1, angle_deg, count=70):
    """Parallel action lines: long thin wedges entering from one side."""
    out = []
    a = math.radians(angle_deg)
    dx, dy = math.cos(a), math.sin(a)
    nx, ny = -dy, dx
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    span = math.hypot(x1 - x0, y1 - y0)
    for _ in range(count):
        off = rng.uniform(-span / 2, span / 2)
        length = rng.uniform(span * 0.25, span * 0.8)
        w = rng.uniform(2, 9)
        sx, sy = cx - dx * span / 2 + nx * off, cy - dy * span / 2 + ny * off
        ex, ey = sx + dx * length, sy + dy * length
        out.append(poly([(sx + nx * w, sy + ny * w), (sx - nx * w, sy - ny * w), (ex, ey)]))
    return ''.join(out)


def swirl(cx, cy, arms=14, r=1400, twist=0.0022, width=0.55):
    out = []
    step = 2 * math.pi / arms
    for k in range(arms):
        base = k * step
        left, right = [], []
        rr = 0.0
        while rr <= r:
            th = base + twist * rr
            left.append((cx + rr * math.cos(th), cy + rr * math.sin(th)))
            th2 = th + step * width
            right.append((cx + rr * math.cos(th2), cy + rr * math.sin(th2)))
            rr += 40
        out.append(poly(left + right[::-1]))
    return ''.join(out)


def focus_burst(cx, cy, inner_rx, inner_ry, outer=2400, count=150, wmin=0.004, wmax=0.03):
    """Manga focus lines: wedges from far outside that stop at a ragged ellipse around the centre."""
    out = []
    for _ in range(count):
        a = rng.uniform(0, 2 * math.pi)
        w = rng.uniform(wmin, wmax)
        stop = rng.uniform(1.0, 1.7)
        tx, ty = cx + inner_rx * stop * math.cos(a), cy + inner_ry * stop * math.sin(a)
        out.append(poly([(cx + outer * math.cos(a - w), cy + outer * math.sin(a - w)), (cx + outer * math.cos(a + w), cy + outer * math.sin(a + w)), (tx, ty)]))
    return ''.join(out)


# ---------------------------------------------------------------- collage
W, H = 1400, 2000
GUTTER = 26
# Horizontal cuts: first/last are flat at the tile edges so the tile repeats seamlessly.
H_CUTS = [(0, 0), (470, 0.07), (930, -0.06), (1440, 0.05), (H, 0)]  # (y at centre, slope)
# Vertical cuts per row: (x at row middle, slope dx/dy)
V_CUTS = [
    [(560, 0.10), (1010, -0.06)],
    [(430, -0.08), (900, 0.09)],
    [(700, 0.07)],
    [(380, 0.06), (860, -0.1)],
]


def hy(i, x):
    y, s = H_CUTS[i]
    return y + s * (x - W / 2)


def vx(cut, y, ymid):
    x, s = cut
    return x + s * (y - ymid)


def corner(hi, cut, ymid):
    if cut is None:
        x = -60 if hi is None else None
    y = H_CUTS[hi][0]
    for _ in range(6):  # fixed-point solve of the two lines
        x = vx(cut, y, ymid)
        y = hy(hi, x)
    return x, y


fills_a, fills_b, gutters, clips = [], [], [], []
painters = ['rays', 'halftone', 'speed', 'swirl', 'burst', 'halftone', 'rays', 'speed', 'swirl', 'halftone', 'burst']
pi = 0
for row in range(len(H_CUTS) - 1):
    ymid = (H_CUTS[row][0] + H_CUTS[row + 1][0]) / 2
    cuts = [(-200, 0)] + V_CUTS[row] + [(W + 200, 0)]
    for c in range(len(cuts) - 1):
        a, b = cuts[c], cuts[c + 1]
        pts = [corner(row, a, ymid), corner(row, b, ymid), corner(row + 1, b, ymid), corner(row + 1, a, ymid)]
        xs = [p[0] for p in pts]
        ys = [p[1] for p in pts]
        x0, x1, y0, y1 = max(min(xs), -40), min(max(xs), W + 40), min(ys), max(ys)
        cid = f'c{row}{c}'
        clips.append(f'<clipPath id="{cid}">{poly(pts)}</clipPath>')
        kind = painters[pi % len(painters)]
        pi += 1
        cx, cy = rng.uniform(x0, x1), rng.uniform(y0, y1)
        if kind == 'rays':
            art = rays(rng.choice([x0, x1]), rng.choice([y0, y1]), n=rng.choice([26, 34, 40]))
        elif kind == 'halftone':
            art = halftone(x0, y0, x1, y1, rng.choice([x0, x1]), rng.choice([y0, y1]))
        elif kind == 'speed':
            art = speed_lines(x0, y0, x1, y1, rng.choice([-24, -12, 16, 28]))
        elif kind == 'swirl':
            art = swirl(cx, cy, arms=rng.choice([12, 16]))
        else:
            art = focus_burst(cx, cy, (x1 - x0) * 0.16, (y1 - y0) * 0.16, count=110)
        (fills_a if (row + c) % 2 == 0 else fills_b).append(f'<g clip-path="url(#{cid})">{art}</g>')
    # gutters for this row's vertical cuts
    for cut in V_CUTS[row]:
        top, bot = corner(row, cut, ymid), corner(row + 1, cut, ymid)
        gutters.append(f'<line x1="{f(top[0])}" y1="{f(top[1])}" x2="{f(bot[0])}" y2="{f(bot[1])}"/>')
for i, (y, s) in enumerate(H_CUTS):
    gutters.append(f'<line x1="-60" y1="{f(hy(i, -60))}" x2="{W + 60}" y2="{f(hy(i, W + 60))}"/>')

svg_open = f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">'
for name, fills in (('collage-fill-a.svg', fills_a), ('collage-fill-b.svg', fills_b)):
    with open(os.path.join(OUT, name), 'w', encoding='utf-8') as fh:
        fh.write(svg_open + '<defs>' + ''.join(clips) + '</defs>' + ''.join(fills) + '</svg>')
with open(os.path.join(OUT, 'collage-gutter.svg'), 'w', encoding='utf-8') as fh:
    fh.write(svg_open + f'<g stroke="#000" stroke-width="{GUTTER}" stroke-linecap="square">' + ''.join(gutters) + '</g></svg>')

# ---------------------------------------------------------------- manga focus lines (ink, not a mask)
FW, FH = 1600, 1000
with open(os.path.join(OUT, 'focus-lines.svg'), 'w', encoding='utf-8') as fh:
    fh.write(
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{FW}" height="{FH}" viewBox="0 0 {FW} {FH}" preserveAspectRatio="xMidYMid slice">'
        f'<g fill="#111014">{focus_burst(FW / 2, FH * 0.56, FW * 0.3, FH * 0.3, outer=1600, count=420, wmin=0.003, wmax=0.022)}</g></svg>'
    )

# ---------------------------------------------------------------- swirl (mask)
SW = 1600
with open(os.path.join(OUT, 'swirl.svg'), 'w', encoding='utf-8') as fh:
    fh.write(f'<svg xmlns="http://www.w3.org/2000/svg" width="{SW}" height="{SW}" viewBox="0 0 {SW} {SW}">{swirl(SW / 2, SW / 2, arms=18, r=1200, twist=0.0016, width=0.5)}</svg>')

for name in ['collage-fill-a.svg', 'collage-fill-b.svg', 'collage-gutter.svg', 'focus-lines.svg', 'swirl.svg']:
    print(name, os.path.getsize(os.path.join(OUT, name)), 'bytes')
