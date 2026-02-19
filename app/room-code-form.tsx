import { Field } from '@/components/ui/field';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSocket } from '@/hooks/use-socket';
import { useRouter } from 'next/navigation';

export default function RoomCodeForm() {
  // TODO: Remove this test — temporary socket connection verification
  const { socket, isConnected } = useSocket();
  const router = useRouter();
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [roomCodeInput, setRoomCodeInput] = useState<string>('');

  // TODO: Remove this. It is for test purpose
  const handleCreateRoom = () => {
    console.log('Handle create room triggered...');
    if (!socket || !isConnected) {
      console.error('Create room failed');
      return;
    }

    socket.emit(
      'create-session',
      { title: 'Test quiz', questions: [] },
      (res: { roomCode: string }) => {
        console.log('Session created: ', res.roomCode);
        setRoomCode(res.roomCode);
        router.push(`/quiz/${res.roomCode}/host-waiting-room`);
      },
    );
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/quiz/${roomCodeInput}/join`);
  };

  return (
    <form onSubmit={handleJoinRoom} className='flex flex-col gap-4'>
      {/* TODO: Remove this test indicator */}
      <p className='text-center text-sm'>
        Socket: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
        {socket?.id && ` (${socket.id})`}
      </p>
      <Button type='button' onClick={handleCreateRoom} disabled={!isConnected}>
        Create Session
      </Button>
      <Field>
        <Input
          type='text'
          inputMode='text'
          autoCapitalize='characters'
          autoCorrect='off'
          spellCheck={false}
          maxLength={6}
          placeholder='Enter room code'
          className='h-16 text-center font-mono tracking-[0.25em] uppercase'
          value={roomCodeInput}
          onChange={(e) => {
            e.currentTarget.value = e.currentTarget.value
              .toUpperCase()
              .replace(/[^A-Z0-9]/g, '');
            setRoomCodeInput(e.currentTarget.value);
          }}
        />
      </Field>
      <Button
        type='submit'
        className='w-full text-xl h-16 uppercasep cursor-pointer'
      >
        Enter
      </Button>
    </form>
  );
}
