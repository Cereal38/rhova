import type { Metadata } from 'next';
import QuizSettingsTopbar from './quiz-settings-topbar';

export const metadata: Metadata = {
  title: 'Rhova',
  description: 'Create or start a quiz in minutes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='antialiased'>
        <QuizSettingsTopbar />
        {children}
      </body>
    </html>
  );
}
