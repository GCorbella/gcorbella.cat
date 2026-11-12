import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getPathname } from './navigation';

export function localizedMetadata(
  locale: Locale,
  href: string,
  title: string,
  description: string,
): Metadata {
  const ca = getPathname({ locale: 'ca', href });

  return {
    title,
    description,
    alternates: {
      canonical: getPathname({ locale, href }),
      languages: {
        ca,
        es: getPathname({ locale: 'es', href }),
        en: getPathname({ locale: 'en', href }),
        'x-default': ca,
      },
    },
  };
}
