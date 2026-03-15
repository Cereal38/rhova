import type { Metadata } from 'next';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';

export const metadata: Metadata = {
  title: 'Rhova',
  description: 'Enter the room code and enjoy a quiz together',
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
