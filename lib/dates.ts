import type { Lang, ScheduleSlot } from '@/content/types';

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

/** "14.00–17.00 WIB" (Indonesian) or "14:00–17:00 WIB" (English). */
export function formatTimeRange(start: string, end: string, lang: Lang): string {
  const t = (hhmm: string) => (lang === 'id' ? hhmm.replace(':', '.') : hhmm);
  return `${t(start)}–${t(end)} WIB`;
}

/** "Rab, 25 Nov · 13.30–18.00 WIB" (Indonesian) or "Wed 25 Nov · 13:30–18:00 WIB" (English). */
export function formatSlot(slot: ScheduleSlot, lang: Lang): string {
  const locale = lang === 'id' ? 'id-ID' : 'en-GB';
  const day = new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric', month: 'short', timeZone: TZ }).format(parse(slot.date));
  return `${day} · ${formatTimeRange(slot.start, slot.end, lang)}`;
}

/** Several slots on the same day become one range: earliest start to latest end. Sorted by date. */
export function mergeSlotsByDay(slots: ScheduleSlot[]): ScheduleSlot[] {
  const byDay = new Map<string, ScheduleSlot>();
  for (const s of slots) {
    const cur = byDay.get(s.date);
    if (!cur) byDay.set(s.date, { date: s.date, start: s.start, end: s.end });
    else byDay.set(s.date, { date: s.date, start: s.start < cur.start ? s.start : cur.start, end: s.end > cur.end ? s.end : cur.end });
  }
  return [...byDay.values()].sort((a, b) => a.date.localeCompare(b.date));
}

/** "Rab, 25 Nov" (Indonesian) or "Wed 25 Nov" (English). */
export function formatDay(date: string, lang: Lang): string {
  const locale = lang === 'id' ? 'id-ID' : 'en-GB';
  return new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric', month: 'short', timeZone: TZ }).format(parse(date));
}
