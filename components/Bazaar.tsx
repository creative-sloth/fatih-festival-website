import { tenants } from '@/content/bazaar';
import type { Lang, Tenant } from '@/content/types';
import { getMessages } from '@/messages';
import s from './Bazaar.module.css';

/** "Tenant Bazaar": the last section of the page. A market-stall look (striped awning, warm orange burst) with the tenant
 *  logos as frameless stickers in two orderly groups: wide logos (3 per row), then square ones (4 per row). */
export default function Bazaar({ lang }: { lang: Lang }) {
  const t = getMessages(lang);
  if (tenants.length === 0) return null;

  const logo = (tn: Tenant) => {
    const img = <img src={tn.src} alt={tn.name} width={tn.width} height={tn.height} loading="lazy" decoding="async" className={s.logo} />;
    return tn.url ? (
      <a className={s.link} href={tn.url} target="_blank" rel="noopener noreferrer">
        {img}
        <span className="sr-only"> {t.detail.newTab}</span>
      </a>
    ) : (
      img
    );
  };
  const group = (kind: Tenant['kind'], className: string) => {
    const items = tenants.filter((tn) => tn.kind === kind);
    if (items.length === 0) return null;
    return (
      <ul className={`${s.logos} ${className}`} aria-label={t.bazaar.label}>
        {items.map((tn) => (
          <li key={tn.name} className={s.item}>
            {logo(tn)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className={s.band} id="bazaar" aria-labelledby="bazaar-title">
      <span className={s.awning} aria-hidden="true" />
      <span className={s.scallops} aria-hidden="true" />
      <div className={s.inner}>
        <h2 className={s.title} id="bazaar-title">
          {t.bazaar.title}
        </h2>
        {group('wide', s.wide)}
        {group('square', s.square)}
      </div>
    </section>
  );
}
