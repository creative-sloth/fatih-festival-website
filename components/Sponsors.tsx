import { sponsors } from '@/content/sponsors';
import type { Lang, Sponsor } from '@/content/types';
import { getMessages } from '@/messages';
import s from './Sponsors.module.css';

const TIERS: Sponsor['tier'][] = [1, 2, 3, 4];
const TIER_CLASS: Record<Sponsor['tier'], string> = { 1: s.t1, 2: s.t2, 3: s.t3, 4: s.t4 };

/** "Special Thanks To": frameless sponsor logos on an antique-gold comic band. One row per contribution tier, from the biggest
 *  contributors (largest logos, top) to the smallest (compact logos, bottom). */
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

  return (
    <section className={s.band} id="sponsor" aria-labelledby="sponsor-title">
      <span className={s.teethTop} aria-hidden="true" />
      <div className={s.inner}>
        <h2 className={s.title} id="sponsor-title">
          {t.sponsors.title}
        </h2>
        {TIERS.map((tier) => {
          const items = sponsors.filter((sp) => sp.tier === tier);
          if (items.length === 0) return null;
          return (
            <ul key={tier} className={`${s.logos} ${TIER_CLASS[tier]}`} aria-label={t.sponsors.label}>
              {items.map((sp) => (
                <li key={sp.name} className={s.item}>
                  {logo(sp)}
                </li>
              ))}
            </ul>
          );
        })}
      </div>
      <span className={s.teethBottom} aria-hidden="true" />
    </section>
  );
}
