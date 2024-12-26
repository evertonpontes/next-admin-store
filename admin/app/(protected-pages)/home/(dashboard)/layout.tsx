import { AppSidebar } from '@/components/app-sidebar';
import { NavBar } from '@/components/nav-bar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { prisma } from '@/prisma';
import React from 'react';
import { StoreModal } from '../components/client';
import { getUserAction } from '@/app/actions';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getUserAction();

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
