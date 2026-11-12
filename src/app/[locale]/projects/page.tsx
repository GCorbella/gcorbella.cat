import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProjectCard } from '@/components/project-card';
import { localizedMetadata } from '@/i18n/metadata';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Projects' });
  return localizedMetadata(locale, '/projects', t('title'), t('description'));
}

export default async function Projects({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Projects');

  return (
    <section className="inner-page">
      <h1>{t('title')}</h1>
      <p className="intro">{t('description')}</p>
      <ProjectCard heading="h2" />
    </section>
  );
}
