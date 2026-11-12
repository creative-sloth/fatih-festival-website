import { sponsors } from '@/content/sponsors';
import type { Lang } from '@/content/types';
import { getMessages } from '@/messages';
import { Bolt, Star } from './ComicShapes';
import s from './Sponsors.module.css';

/** "Special Thanks To": frameless sponsor logos on a blue comic burst band, right after the competition panels. */
export default function Sponsors({ lang }: { lang: Lang }) {
  const t = getMessages(lang);
  if (sponsors.length === 0) return null;
  return (
    <section className={s.band} id="sponsor" aria-labelledby="sponsor-title">
      <span className={s.teethTop} aria-hidden="true" />
      <span className={`${s.decorWrap} ${s.boltL}`} aria-hidden="true">
        <Bolt className={s.decor} />
      </span>
      <span className={`${s.decorWrap} ${s.starL}`} aria-hidden="true">
        <Star className={s.decor} />
      </span>
      <span className={`${s.decorWrap} ${s.boltR}`} aria-hidden="true">
        <Bolt className={`${s.decor} ${s.flip}`} />
      </span>
      <span className={`${s.decorWrap} ${s.starR}`} aria-hidden="true">
        <Star className={s.decor} />
      </span>

      <div className={s.inner}>
        <h2 className={s.title} id="sponsor-title">
          {t.sponsors.title}
        </h2>
        <ul className={s.logos} aria-label={t.sponsors.label}>
          {sponsors.map((sp) => {
            const img = <img src={sp.src} alt={sp.name} width={sp.width} height={sp.height} loading="lazy" decoding="async" className={s.logo} />;
            return (
              <li key={sp.name} className={s.item}>
                {sp.url ? (
                  <a className={s.link} href={sp.url} target="_blank" rel="noopener noreferrer">
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
      <span className={s.teethBottom} aria-hidden="true" />
    </section>
  );
}
