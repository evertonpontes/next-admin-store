'use client';

import { signOutAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';
import { LogOut, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const NavBar = ({ user }: { user: User | null }) => {
  return (
    <header className="h-16 shrink-0 transition-[width,height] ease-linear">
      <div className="h-full flex items-center gap-2 px-4">
        <Link href="/">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <ShoppingBag className="size-5" />
          </div>
        </Link>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">
            {user?.user_metadata.full_name}
          </span>
          <span className="truncate text-xs">{user?.email}</span>
        </div>
        <div className="flex flex-grow justify-end">
          <Button variant="outline" size={'sm'} onClick={signOutAction}>
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
};
