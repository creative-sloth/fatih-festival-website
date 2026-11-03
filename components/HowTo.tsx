import type { Lang } from '@/content/types';
import { getMessages } from '@/messages';
import { Starburst } from './ComicShapes';
import HowToMotion from './HowToMotion';
import s from './HowTo.module.css';

// Each step gets its own panel colour so the strip reads like consecutive comic panels.
const PANEL_TONES = ['sd', 'smp', 'sma', 'unknown'] as const;

function StepArt({ step }: { step: number }) {
  // Simple ink drawings per step; decorative.
  const common = { stroke: 'var(--ink)', strokeWidth: 5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };
  switch (step) {
    case 0: // magnifier over a list
      return (
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <rect x="14" y="16" width="64" height="84" fill="var(--paper)" {...common} />
          <path d="M26 36 H64 M26 52 H58 M26 68 H62" {...common} />
          <circle cx="78" cy="70" r="20" fill="var(--accent-yellow)" {...common} />
          <path d="M92 84 L108 100" {...common} strokeWidth={9} />
        </svg>
      );
    case 1: // document with download arrow
      return (
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <path d="M22 12 H72 L94 34 V106 H22 Z" fill="var(--paper)" {...common} />
          <path d="M72 12 V34 H94" fill="none" {...common} />
          <path d="M58 46 V82 M44 70 L58 84 L72 70" fill="none" {...common} />
        </svg>
      );
    case 2: // form with check
      return (
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <rect x="16" y="14" width="76" height="92" fill="var(--paper)" {...common} />
          <rect x="28" y="30" width="52" height="12" fill="none" {...common} strokeWidth={4} />
          <rect x="28" y="54" width="52" height="12" fill="none" {...common} strokeWidth={4} />
          <circle cx="88" cy="84" r="20" fill="var(--level-sma)" {...common} />
          <path d="M78 84 L86 92 L99 76" fill="none" stroke="var(--paper)" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default: // question mark
      return (
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <path d="M40 42 C40 22 80 20 80 42 C80 58 60 58 60 74" fill="none" {...common} strokeWidth={12} />
          <circle cx="60" cy="96" r="7" fill="var(--ink)" />
        </svg>
      );
  }
}

export default function HowTo({ lang }: { lang: Lang }) {
  const t = getMessages(lang);
  return (
    <section className={s.howto} id="cara-daftar" aria-labelledby="howto-title" data-howto>
      <div className={s.head}>
        <h2 className={s.title} id="howto-title">
          {t.howto.title}
        </h2>
        <p className={s.intro}>{t.howto.intro}</p>
      </div>

      <div className={s.viewport}>
        {/* Step numbers are functional (the order matters), not decorative section numbering. */}
        <ol className={s.strip} data-strip>
          {t.howto.steps.map((step, i) => (
            <li key={i} className={`${s.panel} ht`} data-tone={PANEL_TONES[i]} data-panel>
              <span className={s.num} aria-hidden="true">
                <Starburst className={s.numBurst} />
                <span className={s.numText}>{i + 1}</span>
              </span>
              <div className={s.art} data-art>
                <StepArt step={i} />
              </div>
              <div className={s.caption}>
                <h3 className={step.title === '???' ? `${s.stepTitle} ${s.stepUnknown}` : s.stepTitle}>
                  <span className="sr-only">{i + 1}. </span>
                  {step.title}
                </h3>
                <p className={s.stepBody}>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <HowToMotion />
    </section>
  );
}
