import '@fontsource-variable/instrument-sans';
import './styles.css';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export const metadata: Metadata = {
  metadataBase: new URL('https://gcorbella.cat'),
  title: { default: 'Guille Corbella', template: '%s | Guille Corbella' },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations('Navigation');

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={null}>
          <a className="skip-link" href="#content">{t('skipToContent')}</a>
          <header className="site-header">
            <div className="frame header-inner">
              <Link className="wordmark" href="/">gcorbella<span>.cat</span></Link>
              <nav aria-label={t('mainNavigation')}>
                <ul className="site-nav">
                  <li><Link href="/projects">{t('projects')}</Link></li>
                  <li><Link href="/about">{t('about')}</Link></li>
                  <li><Link href="/contact">{t('contact')}</Link></li>
                </ul>
              </nav>
              <LocaleSwitcher label={t('language')} />
            </div>
          </header>
          <main className="frame main-content" id="content">{children}</main>
          <footer className="site-footer">
            <div className="frame footer-inner">
              <span>Guille Corbella</span>
              <Link href="/contact">{t('contact')} <span aria-hidden="true">↗</span></Link>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
