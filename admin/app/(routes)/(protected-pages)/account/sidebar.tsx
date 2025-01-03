'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  {
    title: 'Profile',
    href: '/account',
  },
  {
    title: 'Appearance',
    href: '/account/appearance',
  },
  {
    title: 'Security',
    href: '/account/security',
  },
];

export const SettingsSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="-mx-4 lg:w-1/5">
      <nav className="h-full flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              'inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground h-9 px-4 py-2 justify-start',
              pathname === item.href
                ? 'bg-muted hover:bg-muted'
                : 'hover:bg-transparent hover:underline'
            )}
          >
            {item.title}
          </Link>
        ))}
        <div className="lg:grow flex items-end px-4">
          <form action="/api/auth/signout" method="post">
            <Button variant="destructive" type="submit">
              Log out
            </Button>
          </form>
        </div>
      </nav>
    </aside>
  );
};
