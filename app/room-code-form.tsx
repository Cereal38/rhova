import { Field } from '@/components/ui/field';
import Form from 'next/form';
import { submitRoomCode } from '@/lib/actions/room-code-action';
import { useActionState, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSocket } from '@/hooks/use-socket';

export default function RoomCodeForm() {
  const [actionState, formAction] = useActionState(submitRoomCode, null);
  // TODO: Remove this test — temporary socket connection verification
  const { socket, isConnected } = useSocket();
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [roomCodeInput, setRoomCodeInput] = useState<string>('');

  // TODO: Remove this. It is for test purpose
  const handleCreateRoom = () => {
    console.log('Handle create room triggered...');
    if (!socket || !isConnected) {
      console.log('Create room failed');
      return;
    }

    socket.emit(
      'create-session',
      { title: 'Test quiz', questions: [] },
      (res: { roomCode: string }) => {
        console.log('Session created: ', res.roomCode);
        setRoomCode(res.roomCode);
      },
    );
  };

  const handleJoinRoom = () => {
    console.log('Trying to join a room...');

    if (!socket || !isConnected) {
      console.log('Joining room failed');
      return;
    }

    socket.emit(
      'join-session',
      roomCodeInput,
      (res: { success: boolean; error?: string }) => {
        console.log('Join success: ', res.success);
      },
    );
  };

  return (
    <Form action={formAction} className='flex flex-col gap-4'>
      {/* TODO: Remove this test indicator */}
      <p className='text-center text-sm'>
        Socket: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
        {socket?.id && ` (${socket.id})`}
      </p>
      <Button type='button' onClick={handleCreateRoom} disabled={!isConnected}>
        Create Session
      </Button>
      <span>{`Room code: ${roomCode}`}</span>
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
      <Button type='button' onClick={handleJoinRoom} disabled={!isConnected}>
        Join Session
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
          // onChange={(e) => {
          //   e.currentTarget.value = e.currentTarget.value
          //     .toUpperCase()
          //     .replace(/[^A-Z0-9]/g, '');
          //   onChange?.(e);
          // }}
        />
      </Field>
      <Button
        type='submit'
        className='w-full text-xl h-16 uppercasep cursor-pointer'
      >
        Enter
      </Button>
    </Form>
  );
}
