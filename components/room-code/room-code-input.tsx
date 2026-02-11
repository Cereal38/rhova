import React from 'react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

type RoomCodeInputProps = Omit<React.ComponentProps<'input'>, 'type'> & {
  codeLength?: number;
};

export default function RoomCodeInput({
  className,
  codeLength = 6,
  onChange,
  ...props
}: RoomCodeInputProps) {
  return (
    <Input
      {...props}
      type='text'
      inputMode='text'
      autoCapitalize='characters'
      autoCorrect='off'
      spellCheck={false}
      maxLength={codeLength}
      placeholder='Enter room code'
      className={cn(
        'h-11 text-center font-mono tracking-[0.25em] uppercase',
        className,
      )}
      // onChange={(e) => {
      //   e.currentTarget.value = e.currentTarget.value
      //     .toUpperCase()
      //     .replace(/[^A-Z0-9]/g, '');
      //   onChange?.(e);
      // }}
    />
  );
}
