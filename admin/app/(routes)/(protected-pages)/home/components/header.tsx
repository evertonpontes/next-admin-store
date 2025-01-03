'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserContext } from '@/contexts/user-context';
import { AvatarImage } from '@radix-ui/react-avatar';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { LogOut, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';
import { useContext } from 'react';

export const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <Link href={'/'}>
          <div className="flex items-center gap-1.5">
            <ShoppingBag className="size-4" />
            ADMIN<i className="font-bold text-xl">&</i>COMMERCE
          </div>
        </Link>
        <div className="grow flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'ghost'} size={'icon'}>
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.avatar_url}
                    alt={user.full_name}
                    className="object-cover aspect-square"
                  />
                  <AvatarFallback className="rounded-lg">
                    {user.full_name.slice(0, 2).toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-48 rounded-lg"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user.avatar_url}
                      alt={user.full_name}
                      className="object-cover aspect-square"
                    />
                    <AvatarFallback className="rounded-lg">
                      {user.full_name.slice(0, 2).toLocaleUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user.full_name}
                    </span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User />
                  <Link href={'/account'}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut />
                  <form action="/api/auth/signout" method="post">
                    <button type="submit">Log out</button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
