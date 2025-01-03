import React from 'react';
import { NavBar } from './components/nav-bar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const supabase = await createClient();
  const { storeId } = await params;

  const { error } = await supabase
    .from('stores')
    .select('*')
    .eq('id', storeId)
    .single();

  if (error) {
    redirect('/home');
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full flex min-h-screen flex-col">
        <NavBar />
        {children}
      </div>
    </SidebarProvider>
  );
}
