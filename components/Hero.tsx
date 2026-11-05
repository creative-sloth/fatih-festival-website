import { competitions } from '@/content/competitions';
import { festival } from '@/content/festival';
import type { Lang } from '@/content/types';
import { getMessages } from '@/messages';
import { Bolt, Sparkle, Star, Starburst } from './ComicShapes';
import HeroMotion from './HeroMotion';
import s from './Hero.module.css';

// One span per glyph so the intro can slam letters individually and each letter can spring when poked.
// The real heading text is in a visually-hidden span; glyph spans are aria-hidden.
function Glyphs({ text, group }: { text: string; group: string }) {
  return (
    <span className={s.word} aria-hidden="true">
      {[...text].map((c, i) => (
        <span key={i} className={s.glyph} data-anim={group} data-glyph>
          {c}
        </span>
      ))}
    </span>
  );
}

function fmtDate(iso: string | null, lang: Lang) {
  if (!iso) return null;
  return new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  }).format(new Date(iso));
}

export default function Hero({ lang }: { lang: Lang }) {
  const t = getMessages(lang);
  const other: Lang = lang === 'id' ? 'en' : 'id';
  const taglineLang = festival.tagline[lang] === festival.tagline.en ? 'en' : lang;

  return (
    <section className={s.hero} id="top" data-hero-root aria-label={`${festival.name} ${festival.edition}`}>
      <div className={s.rays} aria-hidden="true" data-depth="-0.4" />
      <div className={s.dots} aria-hidden="true" />
      <div className={s.spot} aria-hidden="true" data-spot />

      <header className={s.top}>
        <ul className={s.logos} aria-label="Logo">
          {festival.logos.map((logo) => (
            <li key={logo.name} className={s.logoSlot}>
              {logo.src ? (
                <img src={logo.src} alt={logo.name} className={s.logoImg} />
              ) : (
                <>
                  <span className={s.logoTag}>{t.logoPlaceholder}</span>
                  <span className={s.logoName}>{logo.name}</span>
                </>
              )}
              {!logo.src && (
                <span className={s.logoShort} aria-hidden="true">
                  {logo.short}
                </span>
              )}
            </li>
          ))}
        </ul>
        <a className={s.lang} href={`/${other}/`} hrefLang={other} lang={other}>
          <span className="sr-only">{t.langSwitch.otherName}</span>
          <span aria-hidden="true">
            <b>{lang.toUpperCase()}</b> | {t.langSwitch.other}
          </span>
        </a>
      </header>

      <div className={s.stage} data-stage>
        <span className={`${s.decorWrap} ${s.boltL}`} data-depth="1.6">
          <Bolt className={s.decor} anim />
        </span>
        <span className={`${s.decorWrap} ${s.starL}`} data-depth="1.1">
          <Star className={s.decor} anim />
        </span>
        <span className={`${s.decorWrap} ${s.boltR}`} data-depth="1.4">
          <Bolt className={`${s.decor} ${s.flip}`} anim />
        </span>
        <span className={`${s.decorWrap} ${s.starR}`} data-depth="1.9">
          <Star className={s.decor} anim />
        </span>

        <div className={s.titleWrap} data-depth="0.6">
          <h1 className={s.title} data-title>
            <span className="sr-only">
              {festival.name} {festival.edition}
            </span>
            <span className={s.line1}>
              <Glyphs text="FATIH" group="ch1" />
            </span>
            <span className={s.line2}>
              <Glyphs text="FESTIVAL" group="ch2" />
              <span className={s.num} aria-hidden="true">
                <Starburst className={s.burst} anim />
                <span className={s.numText} data-anim="num" data-glyph>
                  {festival.edition}
                </span>
              </span>
            </span>
            <Sparkle className={`${s.sparkle} ${s.sp1}`} anim />
            <Sparkle className={`${s.sparkle} ${s.sp2}`} anim />
            <Sparkle className={`${s.sparkle} ${s.sp3}`} anim />
          </h1>
        </div>

        <div className={s.bubbleWrap} data-depth="1">
          <p className={s.bubble} data-anim="bubble" lang={taglineLang}>
            “{festival.tagline[lang] ?? festival.tagline.id}”
          </p>
        </div>

        <div className={s.actions}>
          {festival.formUrl && (
            <a className={s.cta} href={festival.formUrl} target="_blank" rel="noopener noreferrer">
              {t.hero.ctaRegister} <span className="sr-only">{t.detail.newTab}</span>
            </a>
          )}
          <a className={`${s.cta} ${s.ctaAlt}`} href="#jenjang">
            {t.hero.ctaPrimary}
          </a>
        </div>
      </div>

      <div className={s.captions}>
        <dl className={s.captionList}>
          <div className={s.caption}>
            <dt>{t.hero.date}</dt>
            <dd>{fmtDate(festival.startDate, lang) ?? t.unknown}</dd>
          </div>
          <div className={s.caption}>
            <dt>{t.hero.venue}</dt>
            <dd>{festival.venueShort?.[lang] ?? festival.venueShort?.id ?? t.unknown}</dd>
          </div>
        </dl>
        <p className={`${s.caption} ${s.captionWide}`}>
          {t.hero.competitionsCount(competitions.length)} · {t.hero.levels}
        </p>
      </div>

      <HeroMotion />
    </section>
  );
}
