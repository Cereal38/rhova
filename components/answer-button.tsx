import { Button } from './ui/button';

type Props = {
  children: React.ReactNode;
};

export default function AnswerButton({ children }: Props) {
  return <Button>{children}</Button>;
}
