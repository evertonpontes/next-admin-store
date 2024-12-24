import { AppSidebar } from '@/components/app-sidebar';
import { NavBar } from '@/components/nav-bar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { prisma } from '@/prisma';
import { createClient } from '@/utils/supabase/client';
import React from 'react';
import { StoreModal } from '../components/client';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const stores = await prisma.store.findMany({
    where: {
      ownerId: user?.id,
    },
  });

  return (
    <SidebarProvider>
      <AppSidebar stores={stores} />
      <SidebarInset>
        <div>
          <NavBar />
          {children}
        </div>
      </SidebarInset>
      <StoreModal />
    </SidebarProvider>
  );
}
