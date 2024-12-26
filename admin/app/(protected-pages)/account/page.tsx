import { Separator } from '@/components/ui/separator';
import {
  TypographyH3,
  TypographyLarge,
  TypographyMuted,
} from '@/components/ui/typography';
import React from 'react';
import { AccountForm } from './components/account-form';
import { getUserAction } from '@/app/actions';
import { ResetPasswordForm } from './reset-password/reset-password-form';
import { Button } from '@/components/ui/button';
import { House } from 'lucide-react';
import Link from 'next/link';

export default async function AccountPage() {
  const { user } = await getUserAction();

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 px-4">
        <Button variant={'link'} size={'icon'} asChild>
          <Link href="/home">
            <House className="h-4 w-4" />
          </Link>
        </Button>
      </header>
      <div className="p-8 space-y-8">
        <div>
          <TypographyH3>Account Settings</TypographyH3>
          <TypographyMuted>
            Manage your account settings and set preferences.
          </TypographyMuted>
          <Separator className="mt-6" />
        </div>
        <div>
          <TypographyLarge>Profile</TypographyLarge>
          <TypographyMuted>Update your personal information.</TypographyMuted>
          <Separator className="mt-6" />
          <div className="mt-6">
            <AccountForm user={user} />
          </div>
        </div>
        <div>
          <TypographyLarge>Password</TypographyLarge>
          <TypographyMuted>Reset your password.</TypographyMuted>
          <Separator className="mt-6" />
          <div className="mt-6">
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
