import type { Metadata } from 'next';
import HostWaitingRoomTopbar from './host-waiting-room-topbar';

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
      <HostWaitingRoomTopbar />
      {children}
    </>
  );
}
