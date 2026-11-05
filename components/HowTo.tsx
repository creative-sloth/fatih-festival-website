import type { CSSProperties } from 'react';
import type { Lang } from '@/content/types';
import { festival } from '@/content/festival';
import { getMessages } from '@/messages';
import { Starburst } from './ComicShapes';
import HowToMotion from './HowToMotion';
import s from './HowTo.module.css';

// Each step gets its own panel colour so the chart reads like consecutive comic panels.
const PANEL_TONES = ['sd', 'smp', 'sma', 'unknown'] as const;

// Desktop layout lives in a 1200 x 830 coordinate space. Node boxes and arrows share it, so the whole
// chart scales as one picture (nodes are placed in %, arrows are SVG in the same viewBox).
const W = 1200;
const H = 830;
type Box = { cx: number; cy: number; w: number; h: number };
const BOX = {
  start: { cx: 200, cy: 80, w: 170, h: 130 },
  s1: { cx: 200, cy: 335, w: 300, h: 280 },
  s2: { cx: 600, cy: 335, w: 300, h: 280 },
  decision: { cx: 1000, cy: 335, w: 300, h: 280 },
  chat: { cx: 840, cy: 85, w: 340, h: 100 },
  s3: { cx: 1000, cy: 665, w: 300, h: 280 },
  s4: { cx: 600, cy: 665, w: 300, h: 280 },
  end: { cx: 200, cy: 665, w: 340, h: 300 },
} satisfies Record<string, Box>;

const place = (b: Box, order: number): CSSProperties =>
  ({
    '--x': `${(((b.cx - b.w / 2) / W) * 100).toFixed(3)}%`,
    '--y': `${(((b.cy - b.h / 2) / H) * 100).toFixed(3)}%`,
    '--w': `${((b.w / W) * 100).toFixed(3)}%`,
    '--h': `${((b.h / H) * 100).toFixed(3)}%`,
    '--order': order,
  }) as CSSProperties;

// Arrow paths stop 20 units short of the target; the marker draws the 20-unit head, so the tip lands on the edge.
const LINKS: { d: string; order: number; kind?: 'branch' }[] = [
  { d: 'M200 149 V175', order: 1 },
  { d: 'M354 335 H430', order: 3 },
  { d: 'M754 335 H830', order: 5 },
  { d: 'M1000 191 V159', order: 7, kind: 'branch' },
  { d: 'M670 85 H600 V175', order: 9, kind: 'branch' },
  { d: 'M1000 479 V505', order: 10 },
  { d: 'M846 665 H770', order: 12 },
  { d: 'M446 665 H378', order: 14 },
];

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
  const f = t.howto.flow;
  const stepBoxes = [BOX.s1, BOX.s2, BOX.s3, BOX.s4];
  const stepOrders = [2, 4, 11, 13];

  const step = (i: number) => {
    const st = t.howto.steps[i];
    return (
      <li
        key={`step-${i}`}
        className={`${s.node} ${s.step}`}
        data-tone={PANEL_TONES[i]}
        data-node
        style={place(stepBoxes[i], stepOrders[i])}
      >
        {/* Step numbers are functional (the order matters), not decorative section numbering. */}
        <span className={s.num} aria-hidden="true">
          <Starburst className={s.numBurst} />
          <span className={s.numText}>{i + 1}</span>
        </span>
        <div className={s.art}>
          <StepArt step={i} />
        </div>
        <div className={s.caption}>
          <h3 className={st.title === '???' ? `${s.stepTitle} ${s.stepUnknown}` : s.stepTitle}>
            <span className="sr-only">{i + 1}. </span>
            {st.title}
          </h3>
          <p className={s.stepBody}>{st.body}</p>
          {i === 2 && festival.formUrl && (
            <a className={s.stepLink} href={festival.formUrl} target="_blank" rel="noopener noreferrer">
              {t.howto.formLink} <span className="sr-only">{t.detail.newTab}</span> ›
            </a>
          )}
        </div>
      </li>
    );
  };

  return (
    <section className={s.howto} id="cara-daftar" aria-labelledby="howto-title" data-howto>
      <div className={s.head}>
        <h2 className={s.title} id="howto-title">
          {t.howto.title}
        </h2>
        <p className={s.intro}>{t.howto.intro}</p>
      </div>

      <div className={s.chart}>
        <div className={s.stage}>
          {/* Arrows (desktop only). Drawn twice: an ink outline underneath and a yellow core on top. */}
          <svg className={s.wires} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
            <defs>
              <marker id="ht-head" viewBox="0 0 22 30" refX="0" refY="15" markerWidth="22" markerHeight="30" markerUnits="userSpaceOnUse" orient="auto">
                <path d="M0 0 L22 15 L0 30 Z" fill="var(--accent-yellow)" stroke="var(--ink)" strokeWidth="5" strokeLinejoin="round" />
              </marker>
            </defs>
            {LINKS.map((l) => (
              <g key={l.d} className={s.link} data-link data-kind={l.kind} style={{ '--order': l.order } as CSSProperties}>
                <path d={l.d} fill="none" stroke="var(--ink)" strokeWidth="13" strokeLinejoin="round" />
                <path d={l.d} fill="none" stroke="var(--accent-yellow)" strokeWidth="5" strokeLinejoin="round" markerEnd="url(#ht-head)" />
              </g>
            ))}
          </svg>

          <p className={s.hint} aria-hidden="true">
            {f.hint}
          </p>
          <span className={`${s.tag} ${s.tagYes}`} aria-hidden="true" data-link style={{ '--order': 7 } as CSSProperties}>
            {f.yes}
          </span>
          <span className={`${s.tag} ${s.tagNo}`} aria-hidden="true" data-link style={{ '--order': 10 } as CSSProperties}>
            {f.no}
          </span>

          <ol className={s.flow}>
            <li className={`${s.node} ${s.burstNode}`} data-node style={place(BOX.start, 0)}>
              <Starburst className={s.burstArt} />
              <span className={s.burstText}>{f.start}</span>
            </li>

            {step(0)}
            {step(1)}

            <li className={`${s.node} ${s.decision}`} data-node style={place(BOX.decision, 6)}>
              <svg className={s.diamond} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                <polygon points="50,2 98,50 50,98 2,50" fill="var(--level-smp-sma)" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              </svg>
              <span className={s.question}>{f.question}</span>
              <span className={`sr-only ${s.deskSr}`}>
                {f.yes}: {f.chatTitle}. {f.loop}. {f.no}: {t.howto.steps[2].title}.
              </span>
              {/* Phone layout: both exits are spelled out under the diamond. */}
              <div className={s.branches}>
                <a className={s.branchYes} href="#kontak">
                  <b>{f.yes}</b> {f.chatTitle}
                  <small>{f.loop}</small>
                </a>
                <span className={s.branchNo}>
                  <b>{f.no}</b> {t.howto.steps[2].title}
                </span>
              </div>
            </li>

            {/* Desktop: the "yes" branch is its own bubble that loops back to step 2. */}
            <li className={`${s.node} ${s.chat}`} data-node style={place(BOX.chat, 8)}>
              <a className={s.chatLink} href="#kontak">
                <span className={s.chatTitle}>{f.chatTitle}</span>
                <span className={s.chatBody}>{f.chatBody}</span>
                <span className="sr-only">{f.loop}</span>
              </a>
            </li>

            {step(2)}
            {step(3)}

            <li className={`${s.node} ${s.burstNode} ${s.endNode} ${s.last}`} data-node style={place(BOX.end, 15)}>
              <Starburst className={s.burstArt} outerFill="var(--level-sma)" innerFill="var(--accent-yellow)" />
              <span className={s.burstText}>{f.end}</span>
            </li>
          </ol>
        </div>
      </div>
      <HowToMotion />
    </section>
  );
}
