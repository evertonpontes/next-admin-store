'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';

import { Gauge, Package, ShoppingCart, Tag, User } from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { StoreSwitcher } from '@/components/store-switcher';
import { Store } from '@prisma/client';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  stores: Store[];
}

export const AppSidebar = ({ stores, ...props }: AppSidebarProps) => {
  const data = {
    navMain: [
      {
        title: 'Dashboard',
        url: '/',
        icon: Gauge,
      },
      {
        title: 'Categories',
        url: '/categories',
        icon: Tag,
        isActive: true,
        items: [
          {
            title: 'All categories',
            url: '/',
          },
          {
            title: 'New category',
            url: '/new',
          },
        ],
      },
      {
        title: 'Products',
        url: '/products',
        icon: Package,
        isActive: true,
        items: [
          {
            title: 'All products',
            url: '/',
          },
          {
            title: 'New product',
            url: '/new',
          },
        ],
      },
      {
        title: 'Orders',
        url: '/orders',
        icon: ShoppingCart,
      },
      {
        title: 'Clients',
        url: '/clients',
        icon: User,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <StoreSwitcher stores={stores} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
};
