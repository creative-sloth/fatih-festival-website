// Poster shape vocabulary drawn as inline SVG (no raster clip-art). All decorative → aria-hidden.

type ShapeProps = { className?: string; anim?: boolean };

const burstPoints = (spikes: number, outer: number, inner: number, jitter: number[]) =>
  Array.from({ length: spikes * 2 }, (_, i) => {
    const r = i % 2 === 0 ? outer * jitter[(i / 2) % jitter.length] : inner;
    const a = (Math.PI * i) / spikes - Math.PI / 2;
    return `${(100 + r * Math.cos(a)).toFixed(1)},${(100 + r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');

// Uneven spike lengths make it read as hand-drawn rather than a geometric star.
const BURST_OUTER = burstPoints(14, 96, 58, [1, 0.86, 0.95, 0.8, 1, 0.9, 0.84]);
const BURST_INNER = burstPoints(14, 74, 46, [1, 0.9, 0.82, 0.96, 0.88]);

export function Starburst({ className, anim }: ShapeProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true" data-anim={anim ? 'burst' : undefined}>
      <polygon points={BURST_OUTER} fill="var(--sun-4)" stroke="var(--ink)" strokeWidth="5" strokeLinejoin="round" />
      <polygon points={BURST_INNER} fill="var(--accent-yellow)" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
}

export function Bolt({ className, anim }: ShapeProps) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true" data-anim={anim ? 'decor' : undefined}>
      <path d="M58 6 L18 64 L50 64 L36 114 L102 44 L66 44 L84 6 Z" fill="var(--ink)" transform="translate(6 6)" />
      <path
        d="M58 6 L18 64 L50 64 L36 114 L102 44 L66 44 L84 6 Z"
        fill="var(--accent-yellow)"
        stroke="var(--ink)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const STAR = 'M60 6 L74 42 L112 44 L82 68 L93 106 L60 84 L27 106 L38 68 L8 44 L46 42 Z';

export function Star({ className, anim }: ShapeProps) {
  return (
    <svg className={className} viewBox="0 0 124 120" aria-hidden="true" data-anim={anim ? 'decor' : undefined}>
      <path d={STAR} fill="var(--level-smp-sma)" stroke="var(--ink)" strokeWidth="5" strokeLinejoin="round" transform="translate(8 6)" />
      <path d={STAR} fill="var(--accent-yellow)" stroke="var(--ink)" strokeWidth="5" strokeLinejoin="round" />
    </svg>
  );
}

export function Sparkle({ className, anim }: ShapeProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" data-anim={anim ? 'sparkle' : undefined}>
      <path d="M12 0C12.9 7.6 16.4 11.1 24 12C16.4 12.9 12.9 16.4 12 24C11.1 16.4 7.6 12.9 0 12C7.6 11.1 11.1 7.6 12 0Z" fill="#fff" />
    </svg>
  );
}
