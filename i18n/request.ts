import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // TODO: Should not be static
  const locale = 'en';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
