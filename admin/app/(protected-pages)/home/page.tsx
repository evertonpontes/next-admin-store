import { signOutAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import React from 'react';

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <Button onClick={signOutAction}>Log Out</Button>
      <code>{JSON.stringify(user)}</code>
      Home Page
    </div>
  );
}
