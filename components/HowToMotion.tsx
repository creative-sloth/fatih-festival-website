'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

/** "How to register" comic strip. All four panels are always laid out fully on screen (no sideways scrolling).
 *  Wide screens (≥ 1200 px): the section pins briefly and scrolling inks the panels in one after another.
 *  Smaller screens: each panel inks in as it enters the viewport.
 *  Reduced motion: nothing moves. */
export default function HowToMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-howto]');
    if (!root) return;
    const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-panel]'));
    const mm = gsap.matchMedia();

    const inkIn = (tl: gsap.core.Timeline, panel: HTMLElement, at: number | string) =>
      tl
        .fromTo(panel, { clipPath: 'inset(0 100% 0 0)', y: 30, rotate: -3 }, { clipPath: 'inset(0 0% 0 0)', y: 0, rotate: 0, duration: 0.6, ease: 'power3.out' }, at)
        .fromTo(panel.querySelector('[data-art]'), { scale: 0.3, rotate: -25 }, { scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(2.5)' }, '<0.2');

    mm.add('(min-width: 1200px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)', () => {
      // Pin for ~1 screen once the section reaches the top...
      const pinLength = () => Math.round(window.innerHeight * 1.1);
      ScrollTrigger.create({ trigger: root, start: 'top top', end: () => `+=${pinLength()}`, pin: true, invalidateOnRefresh: true });
      // ...while the ink-in starts earlier, as the section scrolls up, so the strip is never blank on arrival.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 60%',
          end: () => `+=${Math.round(window.innerHeight * 0.6) + pinLength()}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
      panels.forEach((panel, i) => inkIn(tl, panel, i * 0.55));
      tl.to({}, { duration: 0.5 }); // short hold with all four visible before the page moves on
    });

    mm.add('(max-width: 1199px), (max-height: 619px)', () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      panels.forEach((panel) => {
        gsap.set(panel, { clipPath: 'inset(0 100% 0 0)' });
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 88%',
          once: true,
          onEnter: () => inkIn(gsap.timeline(), panel, 0),
        });
      });
    });

    return () => mm.revert();
  }, []);

  return null;
}
