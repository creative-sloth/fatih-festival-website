import { sponsors } from '@/content/sponsors';
import type { Lang } from '@/content/types';
import { getMessages } from '@/messages';
import s from './Sponsors.module.css';

/** "Special Thanks To": the sponsor logos, right after the competition panels so every visitor scrolls past them. */
export default function Sponsors({ lang }: { lang: Lang }) {
  const t = getMessages(lang);
  if (sponsors.length === 0) return null;
  return (
    <section className={s.band} id="sponsor" aria-labelledby="sponsor-title">
      <div className={s.inner}>
        <h2 className={s.title} id="sponsor-title">
          {t.sponsors.title}
        </h2>
        <ul className={s.grid} aria-label={t.sponsors.label}>
          {sponsors.map((sp) => {
            const img = <img src={sp.src} alt={sp.name} width={sp.width} height={sp.height} loading="lazy" decoding="async" className={s.logo} />;
            return (
              <li key={sp.name} className={s.tile}>
                {sp.url ? (
                  <a className={s.tileLink} href={sp.url} target="_blank" rel="noopener noreferrer">
                    {img}
                    <span className="sr-only"> {t.detail.newTab}</span>
                  </a>
                ) : (
                  img
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
