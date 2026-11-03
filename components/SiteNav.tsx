'use client';

import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/content/types';
import { FAVS_EVENT, SHOW_FAVS_EVENT, loadFavorites } from '@/lib/favorites';
import { getMessages } from '@/messages';
import s from './SiteNav.module.css';

/** Compact nav that drops in once the hero cover has scrolled away.
 *  Always in the DOM and keyboard-reachable; focusing it brings it into view. */
export default function SiteNav({ lang }: { lang: Lang }) {
  const t = getMessages(lang);
  const ref = useRef<HTMLElement>(null);
  const other: Lang = lang === 'id' ? 'en' : 'id';
  const [favCount, setFavCount] = useState(0);
  const badgeRef = useRef<HTMLAnchorElement>(null);

  // Favourite count from this browser; the badge bumps when it changes.
  useEffect(() => {
    setFavCount(loadFavorites().length);
    const onFavs = (e: Event) => {
      setFavCount((e as CustomEvent<string[]>).detail.length);
      if (badgeRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.fromTo(badgeRef.current, { scale: 1.35, rotate: -8 }, { scale: 1, rotate: 0, duration: 0.6, ease: 'elastic.out(1.2, 0.4)' });
      }
    };
    window.addEventListener(FAVS_EVENT, onFavs);
    return () => window.removeEventListener(FAVS_EVENT, onFavs);
  }, []);

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
      {favCount > 0 && (
        <a ref={badgeRef} className={s.favs} href="#lomba" onClick={() => window.dispatchEvent(new Event(SHOW_FAVS_EVENT))}>
          <span aria-hidden="true">★</span> {favCount}
          <span className="sr-only"> {t.nav.favorites}</span>
        </a>
      )}
      <a className={s.lang} href={`/${other}/`} hrefLang={other} lang={other}>
        <span className="sr-only">{t.langSwitch.otherName}</span>
        <span aria-hidden="true">{t.langSwitch.other}</span>
      </a>
    </nav>
  );
}
