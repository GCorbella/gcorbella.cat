import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { portfolioProject } from '@/content/projects';
import { localizedMetadata } from '@/i18n/metadata';
import { Link } from '@/i18n/navigation';

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return [{ slug: portfolioProject.slug }];
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  if (slug !== portfolioProject.slug) notFound();

  const t = await getTranslations({ locale, namespace: 'PortfolioProject' });
  return localizedMetadata(locale, `/projects/${slug}`, t('title'), t('description'));
}

export default async function Project({ params }: Props) {
  const { locale, slug } = await params;
  if (slug !== portfolioProject.slug) notFound();

  setRequestLocale(locale);
  const t = await getTranslations('PortfolioProject');
  const projects = await getTranslations('Projects');

  return (
    <article className="inner-page">
      <Link className="back-link" href="/projects"><span aria-hidden="true">←</span> {projects('title')}</Link>
      <h1>{t('title')}</h1>
      <p className="intro">{t('description')}</p>
      <section className="detail-section" aria-labelledby="approach-title">
        <h2 id="approach-title">{t('approach')}</h2>
        <p>{t('implementation')}</p>
        <ul className="technology-list" aria-label={t('technologies')}>
          {portfolioProject.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </section>
    </article>
  );
}
