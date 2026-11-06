import { festival } from '@/content/festival';
import type { Lang } from '@/content/types';
import { getMessages, langs } from '@/messages';

// Static calendar file (iCalendar) built from content/festival.ts, so dates are never typed in two places.
export const dynamic = 'force-static';
export const dynamicParams = false;
export const generateStaticParams = () => langs.map((lang) => ({ lang }));

const BS = String.fromCharCode(92);
// iCalendar text escaping: backslash, semicolon, comma, newline.
const esc = (v: string) =>
  v.split(BS).join(BS + BS).split(';').join(BS + ';').split(',').join(BS + ',').split(String.fromCharCode(10)).join(BS + 'n');
// Lines longer than 75 octets must be folded (RFC 5545 §3.1).
const fold = (line: string) => {
  const out: string[] = [];
  let rest = line;
  while (Buffer.byteLength(rest) > 75) {
    let cut = 74;
    while (Buffer.byteLength(rest.slice(0, cut)) > 74) cut--;
    out.push(rest.slice(0, cut));
    rest = ' ' + rest.slice(cut);
  }
  out.push(rest);
  return out;
};
const day = (iso: string) => iso.replace(/-/g, '');
const nextDay = (iso: string) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10).replace(/-/g, '');
};
const utc = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const t = getMessages(lang);
  const name = `${festival.name} ${festival.edition}`;
  const place = festival.venue?.[lang] ?? festival.venue?.id ?? '';
  const stamp = utc('2026-11-07T00:00:00+07:00');
  const events: string[][] = [];

  if (festival.registrationCloses) {
    const end = new Date(new Date(festival.registrationCloses).getTime() + 60_000).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    events.push([
      'BEGIN:VEVENT',
      'UID:registration-closes@fatih-festival-3.0',
      `DTSTAMP:${stamp}`,
      `DTSTART:${utc(festival.registrationCloses)}`,
      `DTEND:${end}`,
      `SUMMARY:${esc(t.calendar.registrationCloses)}`,
      `DESCRIPTION:${esc(festival.registrationClosesText[lang] ?? "")}`,
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      `DESCRIPTION:${esc(t.calendar.registrationCloses)}`,
      'TRIGGER:-P1D',
      'END:VALARM',
      'END:VEVENT',
    ]);
  }
  if (festival.startDate && festival.endDate) {
    events.push([
      'BEGIN:VEVENT',
      'UID:competition-days@fatih-festival-3.0',
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${day(festival.startDate)}`,
      `DTEND;VALUE=DATE:${nextDay(festival.endDate)}`,
      `SUMMARY:${esc(`${name}: ${t.calendar.competitionDays}`)}`,
      `LOCATION:${esc(place)}`,
      `DESCRIPTION:${esc(t.calendar.note)}`,
      'END:VEVENT',
    ]);
  }
  if (festival.awardingDate) {
    events.push([
      'BEGIN:VEVENT',
      'UID:awarding@fatih-festival-3.0',
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${day(festival.awardingDate)}`,
      `DTEND;VALUE=DATE:${nextDay(festival.awardingDate)}`,
      `SUMMARY:${esc(`${name}: ${t.hero.awarding}`)}`,
      `LOCATION:${esc(place)}`,
      'END:VEVENT',
    ]);
  }

  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Fatih Festival 3.0//Website//EN', 'CALSCALE:GREGORIAN', `X-WR-CALNAME:${esc(name)}`, ...events.flat(), 'END:VCALENDAR'];
  const body = lines.flatMap(fold).join('\r\n') + '\r\n';
  return new Response(body, {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8', 'Content-Disposition': 'attachment; filename="fatih-festival-3.0.ics"' },
  });
}
