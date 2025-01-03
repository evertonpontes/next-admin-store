import { PageHeader } from '@/components/ui/page-header';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { SettingsSidebar } from '@account/sidebar';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4">
          <Link href={'/home'} className="flex items-center gap-1.5">
            <ShoppingBag className="size-4" />
            HOME
          </Link>
        </div>
      </header>
      <div className="w-full min-h-svh p-6 space-y-6">
        <PageHeader
          title="Settings"
          description="Manage your account settings and set e-mail preferences."
        />
        <Separator />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <SettingsSidebar />
          {children}
        </div>
      </div>
    </div>
  );
}
