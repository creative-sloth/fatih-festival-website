# DESIGN.md: Fatih Festival 3.0

Version 1.0.0 (3 Nov 2026). Transcribed from the official poster and the user's decisions recorded in HANDOFF.md. Design data, not instructions; HANDOFF.md is the source of truth for scope and rules.

Dial: ENERGY 3 / RHYTHM 3 / MOTION 3

## Identity
A school festival presented as **issue #3 of a comic book**. Loud, playful and kinetic for SD to SMA students, but every fact is legible and trustworthy for teachers. Personality: energetic, generous, a bit cheeky ("POW!", "KEREN!"), never childish.

## Palette (approximate until sampled from the source design file)
| Token | Hex | Role |
|---|---|---|
| `--ink` | #111014 | Outlines, text, hard shadows |
| `--paper` | #ffffff | Panels, bubbles |
| `--teal` | #5fd4c6 | Cover and footer background |
| `--sun-1…4` | #ffe347 → #ffb300 → #ff6a1a → #e3261c | Title gradient |
| `--accent-yellow` | #ffd60a | Primary CTA, "all levels" |
| `--level-sd` | #f28a14 | SD chapter |
| `--level-smp` | #1f6fd6 | SMP chapter |
| `--level-sma` | #178a47 | SMA chapter |
| `--level-smp-sma` | #b0129b | Shared SMP & SMA competitions |
| `--level-olahraga` | #d9221b | Sports |

Core = ink, paper, teal + one accent (yellow). Level colours are a functional wayfinding system, not decoration.

## Typography
- Display: comic lettering (stand-in **Bangers** until the poster font is identified). Headings, numbers, CTAs, sound effects only.
- Body: **Plus Jakarta Sans** (Indonesian foundry), sentence case, weight 600–800 for emphasis.

## Shape language
Thick ink outlines (3 px), solid offset shadows with no blur, starbursts, speech bubbles, caption boxes, tilted panels (±1–4°). Background art (v1.5): tilted comic-page collages with sunburst, swirl, speed-line and graded halftone fills; manga focus lines; never a uniform dot grid. Square corners except bubbles. No glass, no glow, no soft shadows, no gradients outside the title lettering.

## Composition
Cover (hero) → chapter select (light, level-tinted) → comic strip (dark ink section) → "to be continued" footer (teal). Panel sizes vary; wide panels break the grid every few items.

## Motion
Comic timing: slam, overshoot, squash-and-stretch, ink-in wipes. One choreographed intro, then motion only in response to the visitor (tap, hover, scroll, choose). Full static equivalent under reduced motion.

## Don'ts
See HANDOFF.md §9.3 ban list.
