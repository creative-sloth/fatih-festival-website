"""Generates the Marvel-style panel background for the "Pilih Jenjangmu" section.

Kept separate from make-comic-backgrounds.py so the hero and footer art is untouched.

  marvel-fill-a.svg / marvel-fill-b.svg
      Tilted comic panels, alternating between the two files so CSS can paint them in
      two colours. Each panel is flat colour with Ben-Day dots, a burst, radial rays or
      speed lines, so no two panels read the same. Tiles vertically without a seam.
  marvel-gutter.svg
      The heavy black panel borders. Painted in ink by CSS, this is what makes the
      section read as a printed comic page rather than a soft tinted background.

Run: python scripts/make-marvel-panels.py
"""
import math
import os
import random

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets')
os.makedirs(OUT, exist_ok=True)
rng = random.Random(70)  # fixed seed: the art is the same on every run


def f(v):
    return f'{v:.1f}'.rstrip('0').rstrip('.')


def poly(points, extra=''):
    return '<polygon points="' + ' '.join(f'{f(x)},{f(y)}' for x, y in points) + f'"{extra}/>'


# ---------------------------------------------------------------- pattern painters
def rays(cx, cy, n=28, r=2400, jitter=0.4):
    out = []
    step = 2 * math.pi / n
    for k in range(n):
        a0 = k * step
        w = step * (0.5 + rng.uniform(-jitter, jitter) * 0.5)
        out.append(poly([(cx, cy), (cx + r * math.cos(a0), cy + r * math.sin(a0)),
                         (cx + r * math.cos(a0 + w), cy + r * math.sin(a0 + w))]))
    return ''.join(out)


def ben_day(x0, y0, x1, y1, gx, gy, step=26, max_r=13.0):
    """Ben-Day dots: strongest at (gx, gy), fading across the panel."""
    out = []
    span = math.hypot(x1 - x0, y1 - y0) or 1
    row = 0
    y = y0
    while y < y1:
        x = x0 + (step / 2 if row % 2 else 0)
        while x < x1:
            t = math.hypot(x - gx, y - gy) / span
            r = max_r * max(0.0, 1 - t * 1.05) ** 1.15
            if r > 0.7:
                out.append(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}"/>')
            x += step
        y += step * 0.866
        row += 1
    return ''.join(out)


def focus_burst(cx, cy, inner_rx, inner_ry, outer=2400, count=130, wmin=0.004, wmax=0.028):
    out = []
    for _ in range(count):
        a = rng.uniform(0, 2 * math.pi)
        w = rng.uniform(wmin, wmax)
        stop = rng.uniform(1.0, 1.8)
        tx, ty = cx + inner_rx * stop * math.cos(a), cy + inner_ry * stop * math.sin(a)
        out.append(poly([(cx + outer * math.cos(a - w), cy + outer * math.sin(a - w)),
                         (cx + outer * math.cos(a + w), cy + outer * math.sin(a + w)), (tx, ty)]))
    return ''.join(out)


def speed_lines(x0, y0, x1, y1, angle_deg, count=64):
    out = []
    a = math.radians(angle_deg)
    dx, dy = math.cos(a), math.sin(a)
    nx, ny = -dy, dx
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    span = math.hypot(x1 - x0, y1 - y0)
    for _ in range(count):
        off = rng.uniform(-span / 2, span / 2)
        length = rng.uniform(span * 0.3, span * 0.85)
        w = rng.uniform(3, 11)
        sx, sy = cx - dx * span / 2 + nx * off, cy - dy * span / 2 + ny * off
        ex, ey = sx + dx * length, sy + dy * length
        out.append(poly([(sx + nx * w, sy + ny * w), (sx - nx * w, sy - ny * w), (ex, ey)]))
    return ''.join(out)


# ---------------------------------------------------------------- panel layout
W, H = 1400, 2000
GUTTER = 46  # heavy Marvel borders (the old soft collage used 26)
# Horizontal cuts: flat at the tile edges so the tile repeats seamlessly. Slopes are far
# steeper than the old collage so the panels read as a slanted comic page.
H_CUTS = [(0, 0), (500, 0.16), (960, -0.13), (1480, 0.11), (H, 0)]
# Vertical cuts per row: (x at row middle, dx/dy)
V_CUTS = [
    [(520, 0.20), (1010, -0.14)],
    [(400, -0.17), (880, 0.22)],
    [(700, 0.15)],
    [(360, 0.13), (850, -0.19)],
]


def hy(i, x):
    y, s = H_CUTS[i]
    return y + s * (x - W / 2)


def vx(cut, y, ymid):
    x, s = cut
    return x + s * (y - ymid)


def corner(hi, cut, ymid):
    y = H_CUTS[hi][0]
    x = -80 if cut is None else W + 80
    for _ in range(6):  # fixed-point solve of the two lines
        x = vx(cut, y, ymid)
        y = hy(hi, x)
    return x, y


fills_a, fills_b, gutters, clips = [], [], [], []
painters = ['dots', 'burst', 'rays', 'dots', 'speed', 'burst', 'dots', 'rays', 'speed', 'burst', 'dots', 'rays']
pi = 0
for row in range(len(H_CUTS) - 1):
    ymid = (H_CUTS[row][0] + H_CUTS[row + 1][0]) / 2
    cuts = [(-260, 0)] + V_CUTS[row] + [(W + 260, 0)]
    for c in range(len(cuts) - 1):
        a, b = cuts[c], cuts[c + 1]
        pts = [corner(row, a, ymid), corner(row, b, ymid), corner(row + 1, b, ymid), corner(row + 1, a, ymid)]
        xs = [p[0] for p in pts]
        ys = [p[1] for p in pts]
        x0, x1 = max(min(xs), -60), min(max(xs), W + 60)
        y0, y1 = min(ys), max(ys)
        cid = f'm{row}{c}'
        clips.append(f'<clipPath id="{cid}">{poly(pts)}</clipPath>')
        kind = painters[pi % len(painters)]
        pi += 1
        cx, cy = rng.uniform(x0, x1), rng.uniform(y0, y1)
        if kind == 'dots':
            art = ben_day(x0, y0, x1, y1, rng.choice([x0, x1]), rng.choice([y0, y1]))
        elif kind == 'burst':
            art = focus_burst(cx, cy, (x1 - x0) * 0.2, (y1 - y0) * 0.2, count=120)
        elif kind == 'rays':
            art = rays(rng.choice([x0, x1]), rng.choice([y0, y1]), n=rng.choice([22, 30, 38]))
        else:
            art = speed_lines(x0, y0, x1, y1, rng.choice([-26, -14, 18, 30]))
        (fills_a if (row + c) % 2 == 0 else fills_b).append(f'<g clip-path="url(#{cid})">{art}</g>')
    for cut in V_CUTS[row]:
        top, bot = corner(row, cut, ymid), corner(row + 1, cut, ymid)
        gutters.append(f'<line x1="{f(top[0])}" y1="{f(top[1])}" x2="{f(bot[0])}" y2="{f(bot[1])}"/>')
for i, (y, s) in enumerate(H_CUTS):
    gutters.append(f'<line x1="-80" y1="{f(hy(i, -80))}" x2="{W + 80}" y2="{f(hy(i, W + 80))}"/>')

svg_open = f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">'
for name, fills in (('marvel-fill-a.svg', fills_a), ('marvel-fill-b.svg', fills_b)):
    with open(os.path.join(OUT, name), 'w', encoding='utf-8') as fh:
        fh.write(svg_open + '<defs>' + ''.join(clips) + '</defs>' + ''.join(fills) + '</svg>')
with open(os.path.join(OUT, 'marvel-gutter.svg'), 'w', encoding='utf-8') as fh:
    fh.write(svg_open + f'<g stroke="#000" stroke-width="{GUTTER}" stroke-linecap="square">' + ''.join(gutters) + '</g></svg>')

for name in ['marvel-fill-a.svg', 'marvel-fill-b.svg', 'marvel-gutter.svg']:
    print(name, os.path.getsize(os.path.join(OUT, name)), 'bytes')
