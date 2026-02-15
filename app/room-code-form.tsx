import { Field } from '@/components/ui/field';
import Form from 'next/form';
import { submitRoomCode } from '@/lib/actions/room-code-action';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSocket } from '@/hooks/use-socket';

export default function RoomCodeForm() {
  const [actionState, formAction] = useActionState(submitRoomCode, null);
  // TODO: Remove this test — temporary socket connection verification
  const { socket, isConnected } = useSocket();

  return (
    <Form action={formAction} className='flex flex-col gap-4'>
      {/* TODO: Remove this test indicator */}
      <p className='text-center text-sm'>
        Socket: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
        {socket?.id && ` (${socket.id})`}
      </p>
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
