import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localizedMetadata } from '@/i18n/metadata';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });
  return localizedMetadata(locale, '/contact', t('title'), t('description'));
}

export default async function Contact({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Contact');

  return (
    <section className="inner-page">
      <h1>{t('title')}</h1>
      <p className="intro">{t('description')}</p>
    </section>
  );
}
