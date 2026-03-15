import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

export default getRequestConfig(async () => {
  // If lang is set in cookies, use it, else get browser default
  // and save it to cookies
  const store = await cookies();
  let locale: string | undefined = store.get('locale')?.value;

  if (!locale) {
    const headersList = await headers();
    const acceptLanguage = headersList.get('accept-language') ?? '';
    locale = acceptLanguage.includes('fr') ? 'fr' : 'en';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
