import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href={'/'} className="mx-auto">
          <div className="flex items-center gap-1.5">
            <ShoppingBag className="size-4" />
            ADMIN<i className="font-bold text-xl">&</i>COMMERCE
          </div>
        </Link>
        {children}
      </div>
    </div>
  );
}
