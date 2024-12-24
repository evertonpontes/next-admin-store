import { AppSidebar } from '@/components/app-sidebar';
import { NavBar } from '@/components/nav-bar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div>
          <NavBar />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
