import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import HowTo from '@/components/HowTo';
import LevelExplorer from '@/components/LevelExplorer';
import SiteNav from '@/components/SiteNav';
import type { Lang } from '@/content/types';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  return (
    <>
      <SiteNav lang={lang} />
      <main id="main">
        <Hero lang={lang} />
        <LevelExplorer lang={lang} />
        <HowTo lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
