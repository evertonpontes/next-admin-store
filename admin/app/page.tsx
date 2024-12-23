import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Button variant="outline" size={'sm'}>
        <Link href="/sign-in">Sign In</Link>
      </Button>
      <Button variant="default" size={'sm'}>
        <Link href="/sign-up">Sign Up</Link>
      </Button>
    </div>
  );
}
