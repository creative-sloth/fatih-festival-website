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

// Competition-specific glyphs where the category icon would mislead (colouring is not music, futsal is not basketball).
// They keep their category's data-cat, so the hover animation stays the same.
type Variant = 'palette' | 'mic' | 'soccer';
const variants: Record<Variant, React.ReactNode> = {
  palette: (
    <g strokeWidth="4" stroke={INK} strokeLinejoin="round">
      <path
        d="M32 6 C16 6 6 18 6 31 C6 45 18 56 30 56 C37 56 37 50 34 47 C31 44 33 40 39 40 H48 C54 40 58 36 58 30 C58 17 46 6 32 6 Z"
        fill="var(--paper)"
      />
      <circle cx="20" cy="27" r="5" fill="var(--sun-4)" />
      <circle cx="31" cy="17" r="5" fill="var(--accent-yellow)" />
      <circle cx="44" cy="20" r="5" fill="var(--level-sma)" />
      <circle cx="19" cy="42" r="5" fill="var(--level-smp)" />
    </g>
  ),
  mic: (
    <g strokeWidth="4" stroke={INK} strokeLinejoin="round" strokeLinecap="round">
      <rect x="23" y="4" width="20" height="32" rx="10" fill="var(--level-smp)" />
      <path d="M23 15 H43 M23 23 H43" fill="none" />
      <path d="M14 28 C14 46 52 46 52 28" fill="none" />
      <path d="M33 44 V56 M23 57 H43" fill="none" />
    </g>
  ),
  soccer: (
    <g strokeWidth="4" stroke={INK} strokeLinejoin="round" fill="none">
      <circle cx="33" cy="33" r="23" fill="var(--paper)" />
      <path d="M33 24 L41 30 L38 40 H28 L25 30 Z" fill={INK} />
      <path d="M33 24 V10 M41 30 L54 26 M38 40 L46 52 M28 40 L20 52 M25 30 L12 26" />
    </g>
  ),
};
const variantFor: Record<string, Variant> = {
  'tk-mewarnai': 'palette',
  'smp-sma-desain-grafis': 'palette',
  'sd-vocal-solo': 'mic',
  'smp-vocal-solo': 'mic',
  'sd-futsal': 'soccer',
};

export default function CategoryIcon({ category, slug, className }: { category: Category; slug?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 66 66" aria-hidden="true" data-cat={category}>
      <g transform="translate(3 3)" opacity="1" style={{ filter: 'drop-shadow(3px 3px 0 var(--ink))' }}>
        {(slug && variants[variantFor[slug]]) || shapes[category]}
      </g>
    </svg>
  );
}
