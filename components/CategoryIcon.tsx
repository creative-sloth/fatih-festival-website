import type { Category } from '@/content/types';

// Hand-drawn-style category glyphs in the poster's ink language (thick outline, flat fill, offset shadow).
// Decorative: the category name is always printed next to the icon.
const INK = 'var(--ink)';

const shapes: Record<Category, React.ReactNode> = {
  // Pencil
  Akademik: (
    <g strokeWidth="4" stroke={INK} strokeLinejoin="round">
      <path d="M14 50 L46 18 L54 26 L22 58 L12 60 Z" fill="var(--accent-yellow)" />
      <path d="M46 18 L50 14 Q52 12 54 14 L58 18 Q60 20 58 22 L54 26 Z" fill="var(--sun-4)" />
      <path d="M14 50 L22 58" />
    </g>
  ),
  // Speech bubble
  Bahasa: (
    <g strokeWidth="4" stroke={INK} strokeLinejoin="round">
      <path d="M10 14 H58 V44 H30 L18 56 V44 H10 Z" fill="var(--paper)" />
      <path d="M20 26 H48 M20 34 H40" strokeLinecap="round" />
    </g>
  ),
  // Music note
  Seni: (
    <g strokeWidth="4" stroke={INK} strokeLinejoin="round">
      <path d="M26 46 V14 L54 8 V40" fill="none" />
      <ellipse cx="19" cy="47" rx="9" ry="7" fill="var(--level-smp-sma)" />
      <ellipse cx="47" cy="41" rx="9" ry="7" fill="var(--level-smp-sma)" />
      <path d="M26 20 L54 14" />
    </g>
  ),
  // Camera
  Media: (
    <g strokeWidth="4" stroke={INK} strokeLinejoin="round">
      <path d="M8 22 H20 L25 14 H41 L46 22 H58 V52 H8 Z" fill="var(--level-smp)" />
      <circle cx="33" cy="36" r="10" fill="var(--paper)" />
    </g>
  ),
  // Light bulb
  Inovasi: (
    <g strokeWidth="4" stroke={INK} strokeLinejoin="round">
      <path d="M33 8 C20 8 13 18 15 29 C16 36 22 40 24 46 H42 C44 40 50 36 51 29 C53 18 46 8 33 8 Z" fill="var(--accent-yellow)" />
      <path d="M25 52 H41 M27 58 H39" strokeLinecap="round" />
    </g>
  ),
  // Ball
  Olahraga: (
    <g strokeWidth="4" stroke={INK} strokeLinejoin="round" fill="none">
      <circle cx="33" cy="33" r="23" fill="var(--sun-3)" />
      <path d="M10 33 H56 M33 10 C24 20 24 46 33 56 M33 10 C42 20 42 46 33 56" />
    </g>
  ),
};

export default function CategoryIcon({ category, className }: { category: Category; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 66 66" aria-hidden="true" data-cat={category}>
      <g transform="translate(3 3)" opacity="1" style={{ filter: 'drop-shadow(3px 3px 0 var(--ink))' }}>
        {shapes[category]}
      </g>
    </svg>
  );
}
