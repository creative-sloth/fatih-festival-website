import type { Metadata } from 'next';
import { Bangers, Plus_Jakarta_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../../globals.css';
import { festival } from '@/content/festival';
import type { Lang } from '@/content/types';
import { getMessages, langs } from '@/messages';

const SITE_URL = 'https://fatih-fest.f2005.workers.dev';

// Stand-in fonts until the poster font is identified (HANDOFF.md §9.1).
const display = Bangers({ weight: '400', subsets: ['latin'], variable: '--font-display-loaded' });
const body = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-body-loaded' });

export const dynamicParams = false;
export const generateStaticParams = () => langs.map((lang) => ({ lang }));

const isLang = (v: string): v is Lang => (langs as string[]).includes(v);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const title = `${festival.name} ${festival.edition}`;
  const description = `${title}: ${festival.tagline[lang] ?? festival.tagline.id}. ${festival.host}.`;
  return {
    // Needed so share-preview URLs resolve to absolute. Update if the site moves to its own domain.
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: `/${lang}/`, languages: { id: '/id/', en: '/en/', 'x-default': '/id/' } },
    openGraph: {
      type: 'website',
      siteName: title,
      title,
      description,
      url: `/${lang}/`,
      locale: lang === 'id' ? 'id_ID' : 'en_US',
      images: festival.posterUrl ? [{ url: festival.posterUrl, width: 1131, height: 1600, alt: title }] : [],
    },
    twitter: { card: 'summary_large_image', title, description, images: festival.posterUrl ? [festival.posterUrl] : [] },
  };
}

// Runs before first paint: hide intro glyphs only if the intro will actually play.
const introGate = `try{var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!sessionStorage.getItem('ff-hero-played')){d.dataset.hero='pending';setTimeout(function(){delete d.dataset.hero},1500)}}catch(e){}`;

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getMessages(lang);

  return (
    // suppressHydrationWarning: the pre-paint intro gate sets data-hero on <html> before React hydrates.
    <html lang={lang} className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGate }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          {t.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
