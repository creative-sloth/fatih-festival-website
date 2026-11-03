'use client';

import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { competitions } from '@/content/competitions';
import type { Competition, Lang, Level } from '@/content/types';
import { FAVS_EVENT, SHOW_FAVS_EVENT, loadFavorites, saveFavorites } from '@/lib/favorites';
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

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z"
        fill={filled ? 'var(--accent-yellow)' : 'var(--paper)'}
        stroke="var(--ink)"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Small stars spray out of a freshly starred button: feedback that the save happened. */
function sprayStars(origin: HTMLElement) {
  if (prefersReduced()) return;
  for (let i = 0; i < 7; i++) {
    const p = document.createElement('span');
    p.className = s.spark;
    origin.appendChild(p);
    const angle = (Math.PI * 2 * i) / 7 + gsap.utils.random(-0.3, 0.3);
    const dist = gsap.utils.random(26, 44);
    gsap.fromTo(
      p,
      { x: 0, y: 0, scale: 0.4, opacity: 1, rotate: 0 },
      {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        scale: 1,
        rotate: gsap.utils.random(-120, 120),
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => p.remove(),
      },
    );
  }
}

/** "Pick your level" + favourites + competition panels + detail dialog.
 *  The level lives in the URL (?jenjang=SMP) so a teacher can share a filtered view. */
export default function LevelExplorer({ lang }: { lang: Lang }) {
  const t = getMessages(lang);
  const [level, setLevel] = useState<Filter>('ALL');
  const [favOnly, setFavOnly] = useState(false);
  const [favs, setFavs] = useState<string[]>([]);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const navDir = useRef<1 | -1 | null>(null);
  const revealTriggers = useRef<ScrollTrigger[]>([]);

  const matches = (c: Competition) =>
    inLevel(c, level) && (!favOnly || favs.includes(c.slug));
  const visible = competitions.filter(matches);

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
    setFavs(loadFavorites());
    if (sectionRef.current) sectionRef.current.dataset.tint = initial;

    const onFavs = (e: Event) => setFavs((e as CustomEvent<string[]>).detail);
    window.addEventListener(FAVS_EVENT, onFavs);
    return () => window.removeEventListener(FAVS_EVENT, onFavs);
  }, []);

  // Nav badge asks to show favourites.
  useEffect(() => {
    const onShow = () => applyChange(() => setFavOnly(true));
    window.addEventListener(SHOW_FAVS_EVENT, onShow);
    return () => window.removeEventListener(SHOW_FAVS_EVENT, onShow);
  });

  // ---------- First view: panels ink in as they scroll into view (once) ----------
  useEffect(() => {
    if (prefersReduced()) return;
    const targets = cards().filter((el) => !el.hidden);
    gsap.set(targets, { clipPath: 'inset(0 0 100% 0)' });
    revealTriggers.current = ScrollTrigger.batch(targets, {
      start: 'top 92%',
      once: true,
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { clipPath: 'inset(0 0 100% 0)', y: 40, rotate: () => gsap.utils.random(-4, 4) },
          { clipPath: 'inset(0 0 0% 0)', y: 0, rotate: 0, duration: 0.65, stagger: 0.09, ease: 'power3.out', clearProps: 'transform' },
        ),
    });
    return () => revealTriggers.current.forEach((st) => st.kill());
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

  const toggleFavOnly = () => applyChange(() => setFavOnly((v) => !v));

  const resetAll = (origin: HTMLElement) => {
    if (level !== 'ALL') chooseLevel('ALL', origin);
    applyChange(() => setFavOnly(false));
    syncUrl('ALL');
  };

  const toggleFav = (slug: string, button: HTMLElement) => {
    const adding = !favs.includes(slug);
    const next = adding ? [...favs, slug] : favs.filter((f) => f !== slug);
    if (favOnly && !adding) applyChange(() => setFavs(next));
    else setFavs(next);
    saveFavorites(next);
    if (adding) {
      sprayStars(button);
      if (!prefersReduced())
        gsap.fromTo(button.querySelector('svg'), { scale: 0.4, rotate: -40 }, { scale: 1, rotate: 0, duration: 0.6, ease: 'elastic.out(1.2, 0.4)' });
    }
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
  }, [level, favOnly, favs]);

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
  const filtered = level !== 'ALL' || favOnly;
  const activeName = active ? (active.name[lang] ?? active.name.id) : '';
  const activeFav = active ? favs.includes(active.slug) : false;

  return (
    <section ref={sectionRef} className={s.explorer} id="jenjang" aria-labelledby="jenjang-title">
      <div className={s.gutters} aria-hidden="true" />
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
            {t.explorer.showing(visible.length, level === 'ALL' ? null : level, favOnly)}
          </p>
          <button type="button" className={s.favToggle} aria-pressed={favOnly} onClick={toggleFavOnly}>
            <StarIcon filled={favOnly || favs.length > 0} />
            {t.explorer.favorites(favs.length)}
          </button>
          {filtered && (
            <button type="button" className={s.reset} onClick={(e) => resetAll(e.currentTarget)}>
              {t.explorer.reset}
            </button>
          )}
        </div>

        <ul ref={gridRef} className={s.grid}>
          {competitions.map((c) => {
            const shown = matches(c);
            const isFav = favs.includes(c.slug);
            const name = c.name[lang] ?? c.name.id;
            return (
              <li key={c.slug} data-card data-flip-id={c.slug} hidden={!shown} className={s.cell}>
                <button type="button" className={s.card} data-band={bandOf(c)} data-open onClick={(e) => openDetail(c.slug, e.currentTarget)}>
                  <span className={`${s.band} ht`}>
                    <CategoryIcon category={c.category} className={s.icon} />
                    <span className={s.cat}>{t.categories[c.category]}</span>
                  </span>
                  <span className={s.cardBody}>
                    <span className={s.name} lang={c.name[lang] ? lang : 'id'}>
                      {name}
                    </span>
                    <span className={s.chips}>
                      {c.levels.map((l) => (
                        <span key={l} className={s.chip} data-level={l}>
                          {l}
                        </span>
                      ))}
                    </span>
                    <span className={s.meta}>
                      {t.explorer.registration}: <b>{fmtDate(c.registrationCloses, lang) ?? u}</b>
                    </span>
                    <span className={s.more} aria-hidden="true">
                      {t.explorer.open}
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  className={s.fav}
                  aria-pressed={isFav}
                  aria-label={isFav ? t.explorer.favRemove(name) : t.explorer.favAdd(name)}
                  title={t.explorer.favSaved}
                  onClick={(e) => toggleFav(c.slug, e.currentTarget)}
                >
                  <StarIcon filled={isFav} />
                </button>
              </li>
            );
          })}
        </ul>

        {visible.length === 0 && (
          <div className={s.empty}>
            <p>{favOnly && favs.length === 0 ? t.explorer.emptyFav : t.explorer.empty}</p>
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
                <button
                  type="button"
                  className={s.panelFav}
                  aria-pressed={activeFav}
                  aria-label={activeFav ? t.explorer.favRemove(activeName) : t.explorer.favAdd(activeName)}
                  onClick={(e) => toggleFav(active.slug, e.currentTarget)}
                >
                  <StarIcon filled={activeFav} />
                </button>
              </div>
            </div>

            <dl className={s.facts}>
              {(
                [
                  [t.detail.level, active.levels.join(' · ')],
                  [
                    t.detail.peserta,
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
                    <a href={active.juknisUrl} target="_blank" rel="noopener noreferrer">
                      {t.detail.juknisDownload} <span className="sr-only">{t.detail.newTab}</span>
                    </a>
                  ) : (
                    u
                  )}
                </dd>
              </div>
              <div className={s.fact} data-reveal>
                <dt>{t.detail.contact}</dt>
                <dd className={active.contact?.length ? undefined : s.unknown}>
                  {active.contact?.length ? (
                    active.contact.map((c) => (
                      <a
                        key={c.whatsapp}
                        className={s.contactLink}
                        href={waLink(c.whatsapp, `${t.footer.prefill} (${activeName})`)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {c.name} · {c.whatsapp} <span className="sr-only">{t.detail.newTab}</span>
                      </a>
                    ))
                  ) : (
                    <span className={s.contactNote}>{t.detail.contactUnavailable}</span>
                  )}
                </dd>
              </div>
            </dl>

            {/* No form URL → no active register button (HANDOFF.md §7) */}
            <div className={s.register} data-reveal>
              {active.formUrl ? (
                <a className={s.registerBtn} href={active.formUrl} target="_blank" rel="noopener noreferrer">
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
