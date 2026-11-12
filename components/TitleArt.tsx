import { titleArt } from './titleArt.generated';
import s from './Hero.module.css';

const STOPS: [string, string][] = [
  ['0', '#ffe347'],
  ['0.38', '#ffb300'],
  ['0.7', '#ff6a1a'],
  ['1', '#e3261c'],
];

// Four-point sparkle with concave sides, centred on (x, y).
const sparkle = (x: number, y: number, r: number) =>
  `M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z`;

/** The hero lettering as real geometry, traced from the flyer by scripts/trace-title.mjs.
 *  Layers: ink silhouettes (outline + extrusion) first, then gradient faces with halftone dots, then sparkles.
 *  Each letter's silhouette and face share data-letter so HeroMotion animates them together.
 *  Decorative: the readable title is the visually hidden text in Hero.tsx. */
export default function TitleArt() {
  const { viewBox, gradient, letters, sparkles } = titleArt;
  return (
    <svg className={s.titleSvg} viewBox={viewBox.join(' ')} aria-hidden="true" focusable="false">
      <defs>
        {(['ch1', 'ch2', 'num'] as const).map((g) => (
          <linearGradient key={g} id={`ttl-${g}`} gradientUnits="userSpaceOnUse" x1="0" y1={gradient[g][0]} x2="0" y2={gradient[g][1]}>
            {STOPS.map(([o, c]) => (
              <stop key={o} offset={o} stopColor={c} />
            ))}
          </linearGradient>
        ))}
        <pattern id="ttl-dots" width="34" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(-4)">
          <circle cx="8.5" cy="8.5" r="5.5" fill="#e8460f" fillOpacity="0.55" />
          <circle cx="25.5" cy="25.5" r="5.5" fill="#e8460f" fillOpacity="0.55" />
        </pattern>
      </defs>
      {/* Each animated element sits in a static <g translate(pivot)> so its own origin (0,0) IS the pivot: GSAP then needs no
          SVG-origin bookkeeping. Content is shifted back by the same amount. */}
      {letters.map((l) => (
        <g key={`m${l.id}`} transform={`translate(${l.ox} ${l.oy})`} className={s.titleMass}>
          <g data-anim={l.group} data-letter={l.id}>
            <path d={l.mass} transform={`translate(${-l.ox} ${-l.oy})`} fill="#111014" fillRule="evenodd" />
          </g>
        </g>
      ))}
      {letters.map((l) => (
        <g key={`f${l.id}`} transform={`translate(${l.ox} ${l.oy})`}>
          <g className={s.titleFace} data-anim={l.group} data-glyph data-letter={l.id}>
            <g transform={`translate(${-l.ox} ${-l.oy})`}>
              <path id={`ttl-f${l.id}`} d={l.face} fill={`url(#ttl-${l.group})`} fillRule="evenodd" />
              <use href={`#ttl-f${l.id}`} fill="url(#ttl-dots)" />
            </g>
          </g>
        </g>
      ))}
      {sparkles.map((k, i) => (
        <g key={`s${i}`} transform={`translate(${k.x} ${k.y})`} className={s.titleSparkle}>
          <g data-anim="sparkle">
            <path d={sparkle(0, 0, k.r)} fill="#fff" />
          </g>
        </g>
      ))}
    </svg>
  );
}
