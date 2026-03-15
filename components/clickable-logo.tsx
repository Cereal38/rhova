import { routes } from '@/lib/routes';
import Link from 'next/link';

export default function ClickableLogo() {
  return <Link href={routes.home()}>Rhova</Link>;
}
