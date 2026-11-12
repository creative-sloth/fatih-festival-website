'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

const PLAYED_KEY = 'ff-hero-played';
// Must match the failsafe timer in app/(site)/[lang]/layout.tsx
const INTRO_DEADLINE_MS = 1500;

// Module-level so a dev-mode effect re-run (React Strict Mode) doesn't kill or restart the intro.
let intro: gsap.core.Timeline | null = null;

/** Hero interactivity. Renders nothing; finds its elements under [data-hero-root].
 *  - Intro: ≤ ~1.2s, once per session, skippable, skipped entirely on slow hydration.
 *  - Pointer depth parallax + halftone lens (fine pointers only).
 *  - The title springs when poked.
 *  - The cover tilts away as you scroll past it.
 *  Everything except the intro is set up inside gsap.matchMedia so reduced motion gets none of it. */
export default function HeroMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-hero-root]');
    if (!root) return;
    const html = document.documentElement;
    const cleanups: (() => void)[] = [];
    const q = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T & Element>(sel));

    // ---------- Intro ----------
    if (html.dataset.hero === 'pending' && performance.now() > INTRO_DEADLINE_MS) {
      delete html.dataset.hero;
    }

    if (html.dataset.hero === 'pending') {
      // The official title artwork slams in as one piece, then the whole cover jolts.
      intro = gsap.timeline({ defaults: { ease: 'back.out(2.4)' } });
      intro.fromTo(q('[data-anim="title"]'), { opacity: 0, scale: 2.6, y: -170, rotate: -14 }, { opacity: 1, scale: 1, y: 0, rotate: 0, duration: 0.5, ease: 'back.out(1.8)' }, 0);
      intro
        .to(
          root.querySelector('[data-title]'),
          { keyframes: { x: [0, -9, 8, -5, 3, 0], y: [0, 5, -4, 2, -1, 0] }, duration: 0.16, ease: 'none' },
          0.5,
        )
        .fromTo(
          q('[data-anim="decor"]'),
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, transformOrigin: '50% 50%' },
          0.84,
        )
        .fromTo(q('[data-anim="bubble"]'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.28 }, 0.92)
        .fromTo(
          q('[data-anim="sparkle"]'),
          { opacity: 0, scale: 0, rotate: -90 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.26, stagger: 0.06 },
          0.88,
        );

      // From-states are applied synchronously above, so lifting the gate now causes no flash.
      delete html.dataset.hero;
      try {
        sessionStorage.setItem(PLAYED_KEY, '1');
      } catch {}
    }

    if (intro?.isActive()) {
      const tl = intro;
      const skip = () => tl.progress(1);
      window.addEventListener('pointerdown', skip, { once: true });
      window.addEventListener('keydown', skip, { once: true });
      cleanups.push(() => {
        window.removeEventListener('pointerdown', skip);
        window.removeEventListener('keydown', skip);
      });
    }

    const introDone = () => !intro || !intro.isActive();

    // ---------- Motion that respects reduced-motion ----------
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // The title springs when poked (hover on desktop, tap on touch).
      const title = q('[data-anim="title"]');
      const boing = (el: Element) => {
        if (!introDone() || gsap.isTweening(el)) return;
        gsap.fromTo(el, { scaleX: 1.06, scaleY: 0.94, y: 6 }, { scaleX: 1, scaleY: 1, y: 0, duration: 0.9, ease: 'elastic.out(1.2, 0.32)' });
      };
      const onTitle = (e: Event) => boing(e.currentTarget as Element);
      title.forEach((g) => {
        g.addEventListener('pointerenter', onTitle);
        g.addEventListener('pointerdown', onTitle);
      });

      // The cover tilts away as you scroll into the issue.
      const stage = root.querySelector('[data-stage]');
      const scrollOut = gsap.to(stage, {
        scale: 0.86,
        rotate: -2.5,
        yPercent: 8,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.4 },
      });

      return () => {
        title.forEach((g) => {
          g.removeEventListener('pointerenter', onTitle);
          g.removeEventListener('pointerdown', onTitle);
        });
        scrollOut.scrollTrigger?.kill();
      };
    });

    // Fine pointer only: depth parallax + halftone lens follow the cursor.
    mm.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
      const layers = q('[data-depth]').map((el) => ({
        depth: Number(el.dataset.depth),
        x: gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3' }),
        y: gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3' }),
      }));
      const spot = root.querySelector<HTMLElement>('[data-spot]');
      const sx = spot && gsap.quickTo(spot, 'x', { duration: 0.6, ease: 'power3' });
      const sy = spot && gsap.quickTo(spot, 'y', { duration: 0.6, ease: 'power3' });

      const onMove = (e: PointerEvent) => {
        const r = root.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        layers.forEach((l) => {
          l.x(nx * 22 * l.depth);
          l.y(ny * 16 * l.depth);
        });
        if (spot && sx && sy) {
          sx(e.clientX - r.left - spot.offsetWidth / 2);
          sy(e.clientY - r.top - spot.offsetHeight / 2);
        }
      };
      const onLeave = () => layers.forEach((l) => (l.x(0), l.y(0)));
      root.addEventListener('pointermove', onMove);
      root.addEventListener('pointerleave', onLeave);
      return () => {
        root.removeEventListener('pointermove', onMove);
        root.removeEventListener('pointerleave', onLeave);
      };
    });

    return () => {
      mm.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
