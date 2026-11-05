'use client';

import { useEffect, useRef } from 'react';
import type { Lang } from '@/content/types';
import { getMessages } from '@/messages';
import s from './SiteNav.module.css';

/** Compact nav that drops in once the hero cover has scrolled away.
 *  Always in the DOM and keyboard-reachable; focusing it brings it into view. */
export default function SiteNav({ lang }: { lang: Lang }) {
  const t = getMessages(lang);
  const ref = useRef<HTMLElement>(null);
  const other: Lang = lang === 'id' ? 'en' : 'id';

  useEffect(() => {
    const hero = document.querySelector('[data-hero-root]');
    const nav = ref.current;
    if (!hero || !nav) return;
    const io = new IntersectionObserver(([entry]) => {
      nav.dataset.shown = String(!entry.isIntersecting);
    }, { rootMargin: '-35% 0px 0px 0px' });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const links: [string, string][] = [
    ['#jenjang', t.nav.levels],
    ['#cara-daftar', t.nav.howto],
    ['#kontak', t.nav.contact],
  ];

  return (
    <nav ref={ref} className={s.nav} aria-label={t.nav.label} data-shown="false">
      <a className={s.brand} href="#top">
        FF <span>3.0</span>
      </a>
      <ul className={s.links}>
        {links.map(([href, label]) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
      <a className={s.lang} href={`/${other}/`} hrefLang={other} lang={other}>
        <span className="sr-only">{t.langSwitch.otherName}</span>
        <span aria-hidden="true">{t.langSwitch.other}</span>
      </a>
    </nav>
  );
}
