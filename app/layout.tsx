import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rhova',
  description: 'Enter the room code and enjoy a quiz together',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
