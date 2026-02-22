import HostQuizTopbar from '@/components/host-quiz-topbar';
import type { Metadata } from 'next';

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
    <>
      <HostQuizTopbar />
      {children}
    </>
  );
}
