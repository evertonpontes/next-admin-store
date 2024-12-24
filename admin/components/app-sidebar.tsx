'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';

import { Gauge, Package, ShoppingCart, Tag, User } from 'lucide-react';
import { NavMain } from '@/components/nav-main';

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
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
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
};
