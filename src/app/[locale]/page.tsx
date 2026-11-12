import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProjectCard } from '@/components/project-card';
import { localizedMetadata } from '@/i18n/metadata';
import { Link } from '@/i18n/navigation';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  return localizedMetadata(locale, '/', `${t('role')} | Guille Corbella`, t('introduction'));
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Home');

  return (
    <>
      <section className="hero" aria-labelledby="home-title">
        <p className="role-label">{t('role')}</p>
        <h1 id="home-title">Guille Corbella<span>.</span></h1>
        <p className="intro">{t('introduction')}</p>
        <div className="actions">
          <Link className="primary-action" href="/projects">
            {t('exploreProjects')} <span aria-hidden="true">↗</span>
          </Link>
          <Link className="text-link" href="/about#cv">{t('profileAndCv')}</Link>
        </div>
      </section>
      <section className="featured" aria-labelledby="featured-title">
        <h2 id="featured-title">{t('featured')}</h2>
        <ProjectCard />
      </section>
    </>
  );
}
