'use client';

import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';
import {
  forwardRef,
  type ChangeEvent,
  type DragEvent,
  type ReactNode,
} from 'react';

interface Props {
  id: string;
  label: ReactNode;
  file?: File | null;
  onFileChange: (file: File | undefined) => void;
  accept?: string;
  className?: string;
  disabled?: boolean;
}

export default forwardRef<HTMLInputElement, Props>(function FileDropZone(
  { id, label, file, onFileChange, accept, className, disabled },
  ref,
) {
  return (
    <label
      className={cn(
        'relative flex min-h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed border-input bg-transparent px-4 py-8 text-center shadow-xs transition-[color,box-shadow]',
        'hover:bg-muted/40',
        'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
        disabled && 'pointer-events-none opacity-50',
        className,
      )}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e: DragEvent) => {
        e.preventDefault();
        const dropped = e.dataTransfer.files?.[0];
        if (dropped) onFileChange(dropped);
      }}
    >
      <input
        ref={ref}
        id={id}
        type='file'
        accept={accept}
        className='sr-only'
        disabled={disabled}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onFileChange(e.target.files?.[0])
        }
      />
      <Upload
        className='size-10 shrink-0 text-muted-foreground'
        strokeWidth={1.5}
        aria-hidden
      />
      {file && (
        <span className='max-w-full truncate font-medium text-foreground'>
          {file.name}
        </span>
      )}
      <span className='text-sm text-muted-foreground'>{label}</span>
    </label>
  );
});
