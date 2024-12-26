import React from 'react';
import { redirect } from 'next/navigation';
import { UserContextProvider } from '@/contexts/user-context';
import { getUserAction } from '@/app/actions';
import { createClient } from '@/utils/supabase/client';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { user } = await getUserAction();

  if (!user) {
    return redirect('/sign-in');
  }

  const { data, error, status } = await supabase
    .from('profiles')
    .select(`full_name, username, website, avatar_url`)
    .eq('id', user?.id)
    .single();

  if (error && status !== 406) {
    throw error;
  }

  const profile = {
    ...data,
    id: user?.id,
    email: user?.email,
  };

  return (
    <UserContextProvider user={profile}>
      <div>{children}</div>
    </UserContextProvider>
  );
}
