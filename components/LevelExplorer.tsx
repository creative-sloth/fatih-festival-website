'use client';

import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { competitions } from '@/content/competitions';
import { festival } from '@/content/festival';
import type { Competition, Lang, Level } from '@/content/types';
import { getMessages } from '@/messages';
import { waLink } from '@/lib/whatsapp';
import CategoryIcon from './CategoryIcon';
import s from './LevelExplorer.module.css';

gsap.registerPlugin(Flip, ScrollTrigger);

type Filter = 'ALL' | Level;
const FILTERS: Filter[] = ['ALL', 'TK', 'SD', 'SMP', 'SMA'];
const PARAM_LEVEL = 'jenjang';

const isFilter = (v: string | null): v is Filter => !!v && (FILTERS as string[]).includes(v);
const inLevel = (c: Competition, f: Filter) => f === 'ALL' || c.levels.includes(f);
const countFor = (f: Filter) => competitions.filter((c) => inLevel(c, f)).length;

// Colour band on each card: sports red, shared SMP & SMA magenta, otherwise the level colour (HANDOFF.md §9.1).
const bandOf = (c: Competition) => (c.category === 'Olahraga' ? 'olahraga' : c.levels.length > 1 ? 'shared' : c.levels[0]);

// ---------- Comic-page layout ----------
// The visible competitions are laid out like a comic page: rows of 3 and 2 panels (a lone last panel goes
// full width) separated by slanted gutters. Each gutter has a signed slant in px; the panel on its left
// and the panel on its right use the same value, so the two edges stay parallel. Three layouts are
// computed (desktop 12-column rows, tablet 2-up, phone single column) and picked by CSS media queries.
const SLANTS = [24, -20, 16, -26, 22, -16];
const PATTERNS = ['rays', 'dots', 'burst'] as const;

type Cell = { style: React.CSSProperties; pattern: (typeof PATTERNS)[number] };

function buildLayout(n: number): Cell[] {
  const cells: Cell[] = Array.from({ length: n }, (_, i) => ({
    style: {},
    pattern: PATTERNS[(i + Math.floor(i / 5)) % PATTERNS.length],
  }));
  const px = (v: number) => `${v}px`;

  // Desktop: rows of 3 and 2
  let i = 0;
  let row = 0;
  let twos = 0;
  let threes = 0;
  while (i < n) {
    const rem = n - i;
    let k = rem <= 3 ? rem : row % 2 === 0 ? 3 : 2;
    if (rem > 3 && rem - k === 1) k -= 1;
    const spans =
      k === 1 ? [12] : k === 2 ? (twos++ % 2 === 0 ? [7, 5] : [5, 7]) : threes++ % 2 === 0 ? [4, 4, 4] : [3, 5, 4];
    for (let j = 0; j < k; j++) {
      const left = j > 0 ? SLANTS[(row * 2 + j - 1) % SLANTS.length] : 0;
      const right = j < k - 1 ? SLANTS[(row * 2 + j) % SLANTS.length] : 0;
      Object.assign(cells[i + j].style, { '--span': spans[j], '--sl': px(left), '--sr': px(right) });
    }
    i += k;
    row += 1;
  }

  // Tablet: two columns, last odd panel full width
  for (let t = 0; t < n; t++) {
    const lone = t === n - 1 && t % 2 === 0;
    const s2 = SLANTS[Math.floor(t / 2) % SLANTS.length];
    Object.assign(cells[t].style, {
      '--tspan': lone ? 2 : 1,
      '--tsl': px(!lone && t % 2 === 1 ? s2 : 0),
      '--tsr': px(!lone && t % 2 === 0 ? s2 : 0),
    });
  }

  // Phone: single column, gutters slant alternately
  const g = (t: number) => (t % 2 === 0 ? 12 : -12);
  for (let t = 0; t < n; t++) {
    Object.assign(cells[t].style, { '--sa': px(t > 0 ? g(t - 1) : 0), '--sb': px(t < n - 1 ? g(t) : 0) });
  }
  return cells;
}

const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function fmtDate(iso: string | null, lang: Lang) {
  if (!iso) return null;
  return (
    new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta',
    }).format(new Date(iso)) + ' WIB'
  );
}

function LinkIcon() {
  return (
    <svg className={s.factIcon} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" />
      <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className={s.factIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5a9.4 9.4 0 0 0-8.1 14.2L2.6 21.4l4.8-1.3A9.4 9.4 0 1 0 12 2.5Z" fill="#25d366" stroke="var(--ink)" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8.6 7.6c.3-.3.8-.3 1 .1l.7 1.6c.1.3 0 .6-.2.8l-.5.6c.8 1.5 1.9 2.5 3.4 3.2l.7-.7c.2-.2.5-.3.8-.1l1.5.8c.3.2.4.6.2.9-.5 1-1.5 1.5-2.6 1.3-3-.6-5.2-3-5.9-5.9-.1-.9.2-1.9.9-2.6Z" fill="var(--paper)" />
    </svg>
  );
}

/** "Pick your level" + competition panels + detail dialog.
 *  The level lives in the URL (?jenjang=SMP) so a teacher can share a filtered view. */
export default function LevelExplorer({ lang }: { lang: Lang }) {
  const t = getMessages(lang);
  const [level, setLevel] = useState<Filter>('ALL');
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const navDir = useRef<1 | -1 | null>(null);
  const revealTriggers = useRef<ScrollTrigger[]>([]);

  const matches = (c: Competition) => inLevel(c, level);
  const visible = competitions.filter(matches);
  const layout = buildLayout(visible.length);

  const cards = () => Array.from(gridRef.current?.querySelectorAll<HTMLElement>('[data-card]') ?? []);

  /** Every filter change goes through here: stop first-view reveals, snapshot layout for Flip, then update. */
  const applyChange = (update: () => void) => {
    revealTriggers.current.forEach((st) => st.kill());
    revealTriggers.current = [];
    gsap.set(cards(), { clearProps: 'clipPath' });
    if (!prefersReduced()) flipState.current = Flip.getState(cards());
    update();
  };

  const syncUrl = (nextLevel: Filter) => {
    const url = new URL(window.location.href);
    if (nextLevel === 'ALL') url.searchParams.delete(PARAM_LEVEL);
    else url.searchParams.set(PARAM_LEVEL, nextLevel);
    window.history.replaceState(null, '', url);
  };

  // ---------- Restore state (static export: client only) ----------
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get(PARAM_LEVEL);
    const initial = isFilter(fromUrl) ? fromUrl : 'ALL';
    setLevel(initial);
    if (sectionRef.current) sectionRef.current.dataset.tint = initial;
  }, []);

  // ---------- First view: panels ink in as they scroll into view (once) ----------
  useEffect(() => {
    if (prefersReduced()) return;
    // Wait one frame so a level restored from ?jenjang= has already hidden the other cards;
    // otherwise the triggers would be measured against the unfiltered layout and never fire.
    const frame = requestAnimationFrame(() => {
      const targets = cards().filter((el) => !el.hidden);
      gsap.set(targets, { clipPath: 'inset(0 0 100% 0)' });
      revealTriggers.current = ScrollTrigger.batch(targets, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { clipPath: 'inset(0 0 100% 0)', y: 40, rotate: () => gsap.utils.random(-4, 4) },
            { clipPath: 'inset(0 0 0% 0)', y: 0, rotate: 0, duration: 0.65, stagger: 0.09, ease: 'power3.out', clearProps: 'transform,clipPath' },
          ),
      });
      ScrollTrigger.refresh();
    });
    return () => {
      cancelAnimationFrame(frame);
      revealTriggers.current.forEach((st) => st.kill());
    };
  }, []);

  // ---------- Level choice: halftone wipe from the chosen card ----------
  const chooseLevel = (next: Filter, origin: HTMLElement) => {
    if (next === level) return;
    const section = sectionRef.current;
    const wipe = wipeRef.current;
    if (section && wipe && !prefersReduced()) {
      const sr = section.getBoundingClientRect();
      const or = origin.getBoundingClientRect();
      const at = `${or.left + or.width / 2 - sr.left}px ${or.top + or.height / 2 - sr.top}px`;
      wipe.dataset.tint = next;
      gsap.killTweensOf(wipe);
      gsap.fromTo(
        wipe,
        { clipPath: `circle(0px at ${at})`, opacity: 1 },
        {
          clipPath: `circle(${Math.hypot(sr.width, sr.height)}px at ${at})`,
          duration: 0.7,
          ease: 'power2.inOut',
          onComplete: () => {
            section.dataset.tint = next;
            gsap.to(wipe, { opacity: 0, duration: 0.2 });
          },
        },
      );
    } else if (section) {
      section.dataset.tint = next;
    }
    applyChange(() => setLevel(next));
    syncUrl(next);
  };

  const resetAll = (origin: HTMLElement) => {
    if (level !== 'ALL') chooseLevel('ALL', origin);
    syncUrl('ALL');
  };

  // Re-flow the grid from its previous layout once React has rendered the new filter.
  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state) return;
    flipState.current = null;
    Flip.from(state, {
      duration: 0.6,
      ease: 'back.out(1.2)',
      stagger: 0.02,
      absolute: true,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { opacity: 0, scale: 0.4, rotate: () => gsap.utils.random(-10, 10) },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(2)', stagger: 0.04, delay: 0.15 },
        ),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.4, duration: 0.25, ease: 'power2.in' }),
    });
  }, [level]);

  // ---------- Detail dialog ----------
  const openDetail = (slug: string, el: HTMLElement) => {
    trigger.current = el;
    navDir.current = null;
    setOpenSlug(slug);
  };

  const activeIndex = visible.findIndex((c) => c.slug === openSlug);
  const active = competitions.find((c) => c.slug === openSlug) ?? null;

  const step = useCallback(
    (dir: 1 | -1) => {
      const next = visible[activeIndex + dir];
      const panel = dialogRef.current?.querySelector<HTMLElement>('[data-panel]');
      if (!next || !panel) return;
      const go = () => {
        navDir.current = dir;
        // Focus returns to the card of whichever competition was showing last.
        trigger.current = gridRef.current?.querySelector<HTMLElement>(`[data-flip-id="${next.slug}"] [data-open]`) ?? trigger.current;
        setOpenSlug(next.slug);
      };
      if (prefersReduced()) return go();
      gsap.to(panel, { x: -dir * 60, rotate: -dir * 3, opacity: 0, duration: 0.16, ease: 'power2.in', onComplete: go });
    },
    [visible, activeIndex],
  );

  // Arrow keys page between competitions while the dialog is open.
  const stepRef = useRef(step);
  stepRef.current = step;
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') stepRef.current(1);
      if (e.key === 'ArrowLeft') stepRef.current(-1);
    };
    dialog.addEventListener('keydown', onKey);
    return () => dialog.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!openSlug || !dialog) return;
    if (!dialog.open) dialog.showModal();
    const panel = dialog.querySelector<HTMLElement>('[data-panel]');
    if (!panel || prefersReduced()) return;

    // Paging between competitions: the next panel slides in from the side it came from.
    if (navDir.current) {
      const dir = navDir.current;
      navDir.current = null;
      panel.scrollTop = 0;
      gsap.fromTo(panel, { x: dir * 60, rotate: dir * 3, opacity: 0 }, { x: 0, rotate: 0, opacity: 1, duration: 0.35, ease: 'back.out(1.6)' });
      return;
    }

    // Opening: the panel zooms out of the card it came from.
    const from = trigger.current?.getBoundingClientRect();
    if (!from) return;
    const to = panel.getBoundingClientRect();
    gsap.fromTo(
      panel,
      {
        x: from.left + from.width / 2 - (to.left + to.width / 2),
        y: from.top + from.height / 2 - (to.top + to.height / 2),
        scaleX: from.width / to.width,
        scaleY: from.height / to.height,
        rotate: -3,
        opacity: 1,
      },
      { x: 0, y: 0, scaleX: 1, scaleY: 1, rotate: 0, duration: 0.55, ease: 'back.out(1.3)' },
    );
    gsap.fromTo(panel.querySelectorAll('[data-reveal]'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.04, delay: 0.25 });
  }, [openSlug]);

  const closeDetail = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const finish = () => {
      dialog.close();
      setOpenSlug(null);
      trigger.current?.focus();
    };
    const panel = dialog.querySelector<HTMLElement>('[data-panel]');
    if (!panel || prefersReduced()) return finish();
    gsap.to(panel, {
      scale: 0.85,
      rotate: 3,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(panel, { clearProps: 'all' });
        finish();
      },
    });
  }, []);

  // Horizontal swipe on the panel pages between competitions (vertical scrolling is untouched).
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const onPanelPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onPanelPointerUp = (e: React.PointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
  };

  const u = t.unknown;
  const filtered = level !== 'ALL';
  const activeName = active ? (active.name[lang] ?? active.name.id) : '';
  // A competition without its own PIC falls back to the narahubung of its school level(s).
  const ownContacts = (active?.contact ?? []).filter(
    (c): c is { name: string; whatsapp: string } => !!c.name && !!c.whatsapp,
  );
  const levelGroups = active ? festival.levelContacts.filter((g) => g.levels.some((l) => active.levels.includes(l))) : [];
  const fallbackContacts = levelGroups
    .flatMap((g) => g.people)
    .filter((c): c is { name: string; whatsapp: string } => !!c.name && !!c.whatsapp);
  const contactList = ownContacts.length ? ownContacts : fallbackContacts;
  const contactLabel = ownContacts.length ? t.detail.contact : t.detail.contactFor(levelGroups.map((g) => g.label).join(' & '));
  // The competition's own form wins; otherwise the general registration form.
  const formUrl = active ? (active.formUrl ?? festival.formUrl) : null;

  return (
    <section ref={sectionRef} className={s.explorer} id="jenjang" aria-labelledby="jenjang-title">
      <div ref={wipeRef} className={s.wipe} aria-hidden="true" />

      <div className={s.inner}>
        <header className={s.head}>
          <h2 className={s.title} id="jenjang-title">
            {t.explorer.title}
          </h2>
          <p className={s.intro}>{t.explorer.intro}</p>
        </header>

        <fieldset className={s.picker}>
          <legend className="sr-only">{t.explorer.legend}</legend>
          {FILTERS.map((f) => (
            <label key={f} className={s.option} data-level={f}>
              <input
                className={s.radio}
                type="radio"
                name="jenjang"
                value={f}
                checked={level === f}
                onChange={(e) => chooseLevel(f, e.currentTarget.parentElement as HTMLElement)}
              />
              <span className={s.optCard}>
                <span className={s.optBig}>{f === 'ALL' ? t.explorer.all : f}</span>
                <span className={s.optCount}>{t.explorer.count(countFor(f))}</span>
              </span>
            </label>
          ))}
        </fieldset>

        <div className={s.toolbar}>
          <p className={s.status} id="lomba" aria-live="polite">
            {t.explorer.showing(visible.length, level === 'ALL' ? null : level)}
          </p>
          {filtered && (
            <button type="button" className={s.reset} onClick={(e) => resetAll(e.currentTarget)}>
              {t.explorer.reset}
            </button>
          )}
        </div>

        <ul ref={gridRef} className={s.grid}>
          {competitions.map((c) => {
            const shown = matches(c);
            const name = c.name[lang] ?? c.name.id;
            const cell = layout[visible.indexOf(c)];
            return (
              <li key={c.slug} data-card data-flip-id={c.slug} hidden={!shown} className={s.cell} style={cell?.style}>
                <div className={s.frame}>
                  <button type="button" className={s.card} data-band={bandOf(c)} data-pattern={cell?.pattern} data-open onClick={(e) => openDetail(c.slug, e.currentTarget)}>
                    <span className={s.band}>
                      <span className={s.cat}>{t.categories[c.category]}</span>
                    </span>
                    <CategoryIcon category={c.category} className={s.icon} />
                    <span className={s.cardBody}>
                      <span className={s.name} lang={c.name[lang] ? lang : 'id'}>
                        {name}
                      </span>
                      <span className={s.cardFoot}>
                        <span className={s.chips}>
                          {c.levels.map((l) => (
                            <span key={l} className={s.chip} data-level={l}>
                              {l}
                            </span>
                          ))}
                        </span>
                        <span className={s.more} aria-hidden="true">
                          {t.explorer.open} ›
                        </span>
                      </span>
                    </span>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {visible.length === 0 && (
          <div className={s.empty}>
            <p>{t.explorer.empty}</p>
            <button type="button" className={s.reset} onClick={(e) => resetAll(e.currentTarget)}>
              {t.explorer.reset}
            </button>
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        className={s.dialog}
        aria-labelledby="detail-title"
        onCancel={(e) => {
          e.preventDefault();
          closeDetail();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeDetail();
        }}
      >
        {active && (
          <div
            className={s.panel}
            data-panel
            data-band={bandOf(active)}
            onPointerDown={onPanelPointerDown}
            onPointerUp={onPanelPointerUp}
            onPointerCancel={() => (swipe.current = null)}
          >
            <div className={`${s.panelHead} ht`}>
              <CategoryIcon category={active.category} className={s.panelIcon} />
              <div>
                <p className={s.panelCat} data-reveal>
                  {t.categories[active.category]}
                </p>
                <h3 className={s.panelTitle} id="detail-title" lang={active.name[lang] ? lang : 'id'}>
                  {activeName}
                </h3>
                {!active.name[lang] && t.detail.idOnly && <p className={s.panelNote}>{t.detail.idOnly}</p>}
              </div>
              <div className={s.panelActions}>
                <button type="button" className={s.close} onClick={closeDetail} autoFocus>
                  <span aria-hidden="true">✕</span>
                  <span className="sr-only">{t.detail.close}</span>
                </button>
              </div>
            </div>

            <dl className={s.facts}>
              {(
                [
                  [t.detail.level, active.levels.join(' · ')],
                  [
                    t.detail.participation,
                    t.detail.peserta(
                      active.participation ? t.detail.participationValues[active.participation] : null,
                      active.teamSize,
                    ),
                  ],
                  [t.detail.date, fmtDate(active.competitionDate, lang)],
                  [t.detail.fee, active.fee],
                ] as [string, string | null][]
              ).map(([label, value]) => (
                <div key={label} className={s.fact} data-reveal>
                  <dt>{label}</dt>
                  <dd className={value ? undefined : s.unknown}>{value ?? u}</dd>
                </div>
              ))}
              <div className={s.fact} data-reveal>
                <dt>{t.detail.juknis}</dt>
                <dd className={active.juknisUrl ? undefined : s.unknown}>
                  {active.juknisUrl ? (
                    <a className={s.factLink} href={active.juknisUrl} target="_blank" rel="noopener noreferrer">
                      <LinkIcon />
                      {t.detail.juknisDownload} <span className="sr-only">{t.detail.newTab}</span>
                    </a>
                  ) : (
                    u
                  )}
                </dd>
              </div>
              <div className={s.fact} data-reveal>
                <dt>{contactLabel}</dt>
                <dd>
                  {contactList.length ? (
                    contactList.map((c) => (
                      <a
                        key={c.whatsapp ?? c.name}
                        className={`${s.factLink} ${s.contactLink}`}
                        href={waLink(c.whatsapp!, `${t.footer.prefill} (${activeName})`)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WhatsAppIcon />
                        <span>
                          {c.name} · <span className={s.nowrap}>{c.whatsapp}</span>
                          <span className="sr-only"> {t.detail.newTab}</span>
                        </span>
                      </a>
                    ))
                  ) : (
                    <span className={s.unknown}>{u}</span>
                  )}
                </dd>
              </div>
            </dl>

            {/* No form URL → no active register button (HANDOFF.md §7) */}
            <div className={s.register} data-reveal>
              {formUrl ? (
                <a className={s.registerBtn} href={formUrl} target="_blank" rel="noopener noreferrer">
                  {t.detail.register} <span className={s.newTab}>{t.detail.newTab}</span>
                </a>
              ) : (
                <p className={s.registerNote}>{t.detail.registerUnavailable}</p>
              )}
            </div>

            {visible.length > 1 && activeIndex >= 0 && (
              <nav className={s.pager} aria-label={t.detail.position(activeIndex + 1, visible.length)}>
                <button type="button" className={s.pageBtn} onClick={() => step(-1)} disabled={activeIndex === 0}>
                  <span aria-hidden="true">‹ </span>
                  {t.detail.prev}
                </button>
                <span className={s.pagePos}>{t.detail.position(activeIndex + 1, visible.length)}</span>
                <button type="button" className={s.pageBtn} onClick={() => step(1)} disabled={activeIndex === visible.length - 1}>
                  {t.detail.next}
                  <span aria-hidden="true"> ›</span>
                </button>
              </nav>
            )}
          </div>
        )}
      </dialog>
    </section>
  );
}
