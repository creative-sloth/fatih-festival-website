import type { Lang } from '@/content/types';

const TZ = 'Asia/Jakarta';

/** Date-only values (YYYY-MM-DD) are read as midday WIB so no timezone can shift the day. */
const parse = (iso: string) => new Date(iso.length === 10 ? `${iso}T12:00:00+07:00` : iso);

/** "25–28 November 2026" (same month) or "30 November – 2 Desember 2026". null when either date is missing. */
export function formatDateRange(startIso: string | null, endIso: string | null, lang: Lang): string | null {
  if (!startIso) return null;
  const locale = lang === 'id' ? 'id-ID' : 'en-GB';
  const fmt = (o: Intl.DateTimeFormatOptions, d: Date) => new Intl.DateTimeFormat(locale, { ...o, timeZone: TZ }).format(d);
  const start = parse(startIso);
  const full = { day: 'numeric', month: 'long', year: 'numeric' } as const;
  if (!endIso) return fmt(full, start);
  const end = parse(endIso);
  const sameMonth = fmt({ month: 'numeric', year: 'numeric' }, start) === fmt({ month: 'numeric', year: 'numeric' }, end);
  if (sameMonth) return `${fmt({ day: 'numeric' }, start)}–${fmt(full, end)}`;
  return `${fmt({ day: 'numeric', month: 'long' }, start)} – ${fmt(full, end)}`;
}
