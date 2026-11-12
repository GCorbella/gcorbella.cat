import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localizedMetadata } from '@/i18n/metadata';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });
  return localizedMetadata(locale, '/about', t('title'), t('description'));
}

export default async function About({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('About');

  return (
    <article className="inner-page">
      <h1>{t('title')}</h1>
      <p className="intro">{t('description')}</p>
      <section className="detail-section" id="cv" aria-labelledby="cv-title">
        <h2 id="cv-title">{t('cv')}</h2>
        <p>{t('cvStatus')}</p>
      </section>
    </article>
  );
}
