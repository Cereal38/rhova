import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

type RoomCodeButtonProps = Omit<React.ComponentProps<'input'>, 'type'> & {
  loading?: boolean;
};

export default function RoomCodeButton({
  className,
  loading = false,
  onClick,
  children = 'Enter',
  ...props
}: RoomCodeButtonProps) {
  return (
    <Button
      type='submit'
      disabled={loading}
      className={cn('w-full text-xl h-16 uppercasep cursor-pointer', className)}
      {...props}
    >
      {loading ? 'Joining...' : children}
    </Button>
  );
}
