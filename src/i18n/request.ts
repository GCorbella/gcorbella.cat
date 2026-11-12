import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import ca from '@/messages/ca.json';
import en from '@/messages/en.json';
import es from '@/messages/es.json';
import { routing } from './routing';

const messages: Record<(typeof routing.locales)[number], typeof ca> = { ca, es, en };

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return { locale, messages: messages[locale] };
});
