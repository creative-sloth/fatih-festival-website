"""Generates the graded halftone masks in public/assets/.

Unlike a uniform dot pattern, dot size grows toward one corner (or the centre),
like printed comic shading. The SVGs are used as CSS masks, so one file works in any colour.
Run: python scripts/make-halftones.py
"""
import math
import os

SIZE = 480
STEP = 16          # dot pitch
MAX_R = 7.6        # largest dot radius (nearly touching)
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets')


def dots(radius_at):
    parts = []
    row = 0
    y = STEP / 2
    while y < SIZE + STEP:
        x = STEP / 2 + (STEP / 2 if row % 2 else 0)  # staggered rows, like a print screen
        while x < SIZE + STEP:
            r = radius_at(x, y)
            if r > 0.35:
                parts.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{r:.2f}"/>')
            x += STEP
        y += STEP * 0.866
        row += 1
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{SIZE}" height="{SIZE}" viewBox="0 0 {SIZE} {SIZE}">'
        + ''.join(parts)
        + '</svg>'
    )


def corner(cx, cy):
    def f(x, y):
        t = math.hypot(x - cx, y - cy) / (SIZE * 1.05)
        return MAX_R * max(0.0, 1 - t) ** 1.35
    return f


def radial(x, y):
    t = math.hypot(x - SIZE / 2, y - SIZE / 2) / (SIZE / 2)
    return MAX_R * max(0.0, 1 - t) ** 1.2


os.makedirs(OUT, exist_ok=True)
variants = {
    'halftone-tl.svg': corner(0, 0),
    'halftone-tr.svg': corner(SIZE, 0),
    'halftone-br.svg': corner(SIZE, SIZE),
    'halftone-bl.svg': corner(0, SIZE),
    'halftone-radial.svg': radial,
}
for name, fn in variants.items():
    with open(os.path.join(OUT, name), 'w', encoding='utf-8') as fh:
        fh.write(dots(fn))
    print(name, os.path.getsize(os.path.join(OUT, name)), 'bytes')
