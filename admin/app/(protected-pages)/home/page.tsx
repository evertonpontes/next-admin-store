import { createClient } from '@/utils/supabase/server';
import React from 'react';
import { NavBar } from './components/nav-bar';
import { StoreClient } from './components/client';
import { prisma } from '@/prisma';

export default async function HomePage() {
  const supabase = await createClient();

  const stores = await prisma.store.findMany();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main>
      <NavBar user={user} />
      <StoreClient stores={stores} />
    </main>
  );
}
