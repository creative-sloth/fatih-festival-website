import type { CSSProperties } from 'react';
import { tenants } from '@/content/bazaar';
import type { Lang, Tenant } from '@/content/types';
import { getMessages } from '@/messages';
import s from './Bazaar.module.css';

const place = (tn: Tenant, i: number): CSSProperties =>
  ({
    '--x': `${tn.layout.x}%`,
    '--y': `${tn.layout.y}%`,
    '--w': `${tn.layout.w}%`,
    '--wn': tn.layout.w,
    '--r': `${tn.layout.r}deg`,
    // phones: small alternating vertical nudges so the wrapped logos still look loose
    '--nudge': `${[0, 14, -6, 18, 4, -10][i % 6]}px`,
  }) as CSSProperties;

/** "Tenant Bazaar": the last section of the page. A market-stall look (striped awning over a pink burst with food, drink and
 *  accessory doodles) with the tenant logos scattered around as frameless stickers. */
export default function Bazaar({ lang }: { lang: Lang }) {
  const t = getMessages(lang);
  if (tenants.length === 0) return null;

  return (
    <section className={s.band} id="bazaar" aria-labelledby="bazaar-title">
      <span className={s.awning} aria-hidden="true" />
      <span className={s.scallops} aria-hidden="true" />
      <div className={s.inner}>
        <h2 className={s.title} id="bazaar-title">
          {t.bazaar.title}
        </h2>
        <ul className={s.board} aria-label={t.bazaar.label}>
          {tenants.map((tn, i) => {
            const img = <img src={tn.src} alt={tn.name} width={tn.width} height={tn.height} loading="lazy" decoding="async" className={s.logo} />;
            return (
              <li key={tn.name} className={s.item} style={place(tn, i)}>
                {tn.url ? (
                  <a className={s.link} href={tn.url} target="_blank" rel="noopener noreferrer">
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
