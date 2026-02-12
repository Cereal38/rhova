import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Topbar from '@/components/topbar';

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
      <body className='antialiased'>
        <Topbar />
        {children}
      </body>
    </html>
  );
}
