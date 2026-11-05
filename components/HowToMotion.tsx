'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

/** "How to register" flowchart. Everything is always laid out and readable; motion only adds the reveal.
 *  Wide screens (>= 1100 px): when the chart scrolls into view, nodes and arrows pop in once, in flow order.
 *  Smaller screens: each node pops in as it enters the viewport.
 *  Only transform and opacity are animated. Reduced motion: nothing moves. */
export default function HowToMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-howto]');
    if (!root) return;
    const mm = gsap.matchMedia();
    const order = (el: Element) => Number(getComputedStyle(el).getPropertyValue('--order')) || 0;

    mm.add('(min-width: 1100px) and (prefers-reduced-motion: no-preference)', () => {
      const parts = Array.from(root.querySelectorAll<HTMLElement | SVGElement>('[data-node], [data-link]')).sort(
        (a, b) => order(a) - order(b),
      );
      const nodes = parts.filter((p) => p.hasAttribute('data-node'));
      const links = parts.filter((p) => p.hasAttribute('data-link'));
      gsap.set(nodes, { opacity: 0, scale: 0.55, y: 24 });
      gsap.set(links, { opacity: 0, scale: 0.6 });

      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: { trigger: root.querySelector('[data-node]'), start: 'top 85%', once: true, onEnter: () => tl.play() },
      });
      parts.forEach((p, i) => {
        const isNode = p.hasAttribute('data-node');
        tl.to(
          p,
          isNode
            ? { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(2.2)' }
            : { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(3)' },
          i * 0.16,
        );
      });
    });

    mm.add('(max-width: 1099px) and (prefers-reduced-motion: no-preference)', () => {
      const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-node]')).filter((n) => getComputedStyle(n).display !== 'none');
      nodes.forEach((n) => {
        gsap.set(n, { opacity: 0, scale: 0.7, y: 30 });
        ScrollTrigger.create({
          trigger: n,
          start: 'top 92%',
          once: true,
          onEnter: () => gsap.to(n, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(2.2)' }),
        });
      });
    });

    return () => mm.revert();
  }, []);

  return null;
}
