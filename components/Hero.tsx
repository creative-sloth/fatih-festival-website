import { festival } from '@/content/festival';
import type { Lang } from '@/content/types';
import { formatDateRange, formatSlot } from '@/lib/dates';
import { getMessages } from '@/messages';
import { Bolt, Star } from './ComicShapes';
import Countdown from './Countdown';
import RegisterLink from './RegisterLink';
import HeroMotion from './HeroMotion';
import LangLink from './LangLink';
import TitleArt from './TitleArt';
import s from './Hero.module.css';

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
                <img src={logo.src} alt={logo.name} width={logo.width} height={logo.height} className={s.logoImg} />
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
        <LangLink to={other} className={s.lang}>
          <span className="sr-only">{t.langSwitch.otherName}</span>
          <span aria-hidden="true">
            <b>{lang.toUpperCase()}</b> | {t.langSwitch.other}
          </span>
        </LangLink>
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
            <TitleArt />
          </h1>
        </div>

        <div className={s.bubbleWrap} data-depth="1">
          <p className={s.bubble} data-anim="bubble" lang={taglineLang}>
            “{festival.tagline[lang] ?? festival.tagline.id}”
          </p>
        </div>

        <div className={s.actions}>
          <RegisterLink className={s.cta}>
            {t.hero.ctaRegister} <span className="sr-only">{t.detail.newTab}</span>
          </RegisterLink>
          <a className={`${s.cta} ${s.ctaAlt}`} href="#jenjang">
            {t.hero.ctaPrimary}
          </a>
          {festival.juknisUrl && (
            <a className={`${s.cta} ${s.ctaAlt}`} href={festival.juknisUrl} target="_blank" rel="noopener noreferrer">
              {t.hero.ctaRundown} <span className="sr-only">{t.detail.newTab}</span>
            </a>
          )}
        </div>

        <Countdown lang={lang} />
      </div>

      <div className={s.captions}>
        <dl className={s.captionList}>
          <div className={s.caption}>
            <dt>{t.hero.date}</dt>
            <dd>{formatDateRange(festival.startDate, festival.endDate, lang) ?? t.unknown}</dd>
          </div>
          <div className={s.caption}>
            <dt>{t.hero.awarding}</dt>
            <dd>{festival.awarding ? formatSlot(festival.awarding, lang) : t.detail.tba}</dd>
          </div>
          <div className={s.caption}>
            <dt>{t.hero.venue}</dt>
            <dd>{festival.venueShort?.[lang] ?? festival.venueShort?.id ?? t.unknown}</dd>
          </div>
        </dl>
      </div>

      <HeroMotion />
    </section>
  );
}
