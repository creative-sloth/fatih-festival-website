import { sponsors } from '@/content/sponsors';
import type { Lang, Sponsor } from '@/content/types';
import { getMessages } from '@/messages';
import s from './Sponsors.module.css';

/** "Special Thanks To": frameless sponsor logos on a light sky comic burst band, right after the competition panels.
 *  Two orderly groups: the wordmarks (large, 3 per row) and then the emblems (4 per row). */
export default function Sponsors({ lang }: { lang: Lang }) {
  const t = getMessages(lang);
  if (sponsors.length === 0) return null;

  const logo = (sp: Sponsor) => {
    const img = <img src={sp.src} alt={sp.name} width={sp.width} height={sp.height} loading="lazy" decoding="async" className={s.logo} />;
    return sp.url ? (
      <a className={s.link} href={sp.url} target="_blank" rel="noopener noreferrer">
        {img}
        <span className="sr-only"> {t.detail.newTab}</span>
      </a>
    ) : (
      img
    );
  };
  const group = (kind: Sponsor['kind'], className: string) => {
    const items = sponsors.filter((sp) => sp.kind === kind);
    if (items.length === 0) return null;
    return (
      <ul className={`${s.logos} ${className}`} aria-label={t.sponsors.label}>
        {items.map((sp) => (
          <li key={sp.name} className={s.item}>
            {logo(sp)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className={s.band} id="sponsor" aria-labelledby="sponsor-title">
      <span className={s.teethTop} aria-hidden="true" />
      <div className={s.inner}>
        <h2 className={s.title} id="sponsor-title">
          {t.sponsors.title}
        </h2>
        {group('wordmark', s.words)}
        {group('emblem', s.emblems)}
      </div>
      <span className={s.teethBottom} aria-hidden="true" />
    </section>
  );
}
