import { festival } from '@/content/festival';
import type { Lang } from '@/content/types';
import { waLink } from '@/lib/whatsapp';
import { getMessages } from '@/messages';
import s from './Footer.module.css';

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.5a9.4 9.4 0 0 0-8.1 14.2L2.6 21.4l4.8-1.3A9.4 9.4 0 1 0 12 2.5Z"
        fill="#25d366"
        stroke="var(--ink)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8.6 7.6c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .6.4l.8 1.9c.1.2.1.4 0 .6l-.5.7c-.1.2-.1.3 0 .5.6 1 1.4 1.8 2.4 2.4.2.1.3.1.5 0l.7-.8c.2-.2.4-.2.6-.1l1.9.9c.2.1.3.3.3.5 0 .6-.3 1.4-1 1.7-.7.4-1.6.4-3.4-.4-2-.9-3.6-2.8-4.2-3.9-.6-1.1-.7-2 .1-3.9Z"
        fill="var(--paper)"
      />
    </svg>
  );
}

export default function Footer({ lang }: { lang: Lang }) {
  const t = getMessages(lang);

  return (
    <footer className={s.footer} id="kontak" aria-labelledby="kontak-title">
      <p className={s.tbc}>{t.footer.tbc}</p>
      <div className={s.box}>
        <h2 className={s.title} id="kontak-title">
          {t.footer.contactTitle}
        </h2>
        <ul className={s.list}>
          {festival.levelContacts.map((group) => (
            <li key={group.label} className={s.person}>
              <span className={s.label}>{t.footer.group(group.label)}</span>
              {group.people.map((person) => (
                <span key={person.whatsapp ?? person.name} className={s.contactRow}>
                  <span className={s.name}>{person.name}</span>
                  {person.whatsapp ? (
                    <a className={s.wa} href={waLink(person.whatsapp, `${t.footer.prefill} (${group.label})`)} target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon />
                      <span>
                        {person.whatsapp}
                        <span className={s.waHint}>
                          {t.footer.chat} <span className="sr-only">{t.detail.newTab}</span>
                        </span>
                      </span>
                    </a>
                  ) : (
                    <span className={`${s.wa} ${s.waEmpty}`}>
                      <WhatsAppIcon />
                      <span className={s.unknown}>{t.unknown}</span>
                    </span>
                  )}
                </span>
              ))}
            </li>
          ))}
        </ul>
      </div>
      <p className={s.host}>
        {t.footer.host} <b>{festival.host}</b>
        {festival.venue && (
          <>
            <br />
            <span className={s.address}>{festival.venue[lang] ?? festival.venue.id}</span>
          </>
        )}
      </p>
    </footer>
  );
}
