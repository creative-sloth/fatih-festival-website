'use client';

import type { Lang } from '@/content/types';

const SECTIONS = ['jenjang', 'cara-daftar', 'kontak'];

/** Language switch that stays where the visitor is: same section, same ?jenjang= level.
 *  Without JavaScript (or with a modified click) it is a normal link to the other language's top. */
export default function LangLink({ to, className, children }: { to: Lang; className?: string; children: React.ReactNode }) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    // The last section whose top has passed the upper part of the screen is "where the visitor is".
    const here = SECTIONS.filter((id) => {
      const el = document.getElementById(id);
      return el && el.getBoundingClientRect().top <= window.innerHeight * 0.4;
    }).pop();
    e.preventDefault();
    window.location.assign(`/${to}/${window.location.search}${here ? `#${here}` : ''}`);
  };
  return (
    <a className={className} href={`/${to}/`} hrefLang={to} lang={to} onClick={onClick}>
      {children}
    </a>
  );
}
