'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const languageNames = { ca: 'Català', es: 'Castellano', en: 'English' };

export function LocaleSwitcher({ label }: { label: string }) {
  const activeLocale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={label}>
      <ul className="language-list">
        {routing.locales.map((locale) => (
          <li key={locale}>
            <Link
              aria-current={locale === activeLocale ? 'page' : undefined}
              aria-label={languageNames[locale]}
              href={pathname}
              hrefLang={locale}
              lang={locale}
              locale={locale}
              prefetch={false}
            >
              {locale.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
