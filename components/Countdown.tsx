'use client';

import { useEffect, useState } from 'react';
import type { Lang } from '@/content/types';
import { festival } from '@/content/festival';
import { getMessages } from '@/messages';
import s from './Countdown.module.css';

const pad = (n: number) => String(n).padStart(2, '0');

/** Big comic countdown to the shared registration deadline.
 *  While `festival.registrationCloses` is null (not announced) it shows the "? Nov 2026" label and "??" tiles,
 *  so no date is invented. The first render is always the static placeholder (matches the exported HTML). */
export default function Countdown({ lang }: { lang: Lang }) {
  const t = getMessages(lang);
  const target = festival.registrationCloses ? new Date(festival.registrationCloses).getTime() : null;
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (target === null) return;
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const left = target !== null && now !== null ? Math.max(0, target - now) : null;
  const closed = target !== null && now !== null && target <= now;
  const parts =
    left === null
      ? null
      : {
          d: Math.floor(left / 86_400_000),
          h: Math.floor((left % 86_400_000) / 3_600_000),
          m: Math.floor((left % 3_600_000) / 60_000),
          s: Math.floor((left % 60_000) / 1000),
        };

  const label = festival.registrationClosesText[lang] ?? festival.registrationClosesText.id;
  const units = [
    ['d', t.hero.countdown.units.d],
    ['h', t.hero.countdown.units.h],
    ['m', t.hero.countdown.units.m],
    ['s', t.hero.countdown.units.s],
  ] as const;

  return (
    <div className={s.wrap} role="group" aria-label={t.hero.countdown.title}>
      <p className={s.title}>
        {t.hero.countdown.title}
        <b>{closed ? t.hero.countdown.closed : label}</b>
      </p>
      {!closed && (
        <ol className={s.tiles} aria-hidden="true">
          {units.map(([k, name]) => (
            <li key={k} className={s.tile}>
              <span className={s.digits}>{parts ? pad(parts[k]) : '??'}</span>
              <span className={s.unit}>{name}</span>
            </li>
          ))}
        </ol>
      )}
      {/* Static summary for screen readers; deliberately not live, so it does not announce every second. */}
      {parts && !closed && (
        <span className="sr-only">
          {parts.d} {t.hero.countdown.units.d}, {parts.h} {t.hero.countdown.units.h}
        </span>
      )}
    </div>
  );
}
