'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function StartQuizButton() {
  const { roomCode } = useParams();

  return (
    <Button asChild className='w-full'>
      <Link href={`/quiz/${roomCode}/host-play`}>Start the quiz</Link>
    </Button>
  );
}
