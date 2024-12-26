'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';

import { Bolt, Gauge, Package, ShoppingCart, Tag, User } from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { StoreSwitcher } from '@/components/store-switcher';
import { Store } from '@prisma/client';
import { NavUser } from '@/components/nav-user';
import { useParams } from 'next/navigation';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  stores: Store[];
}

export const AppSidebar = ({ stores, ...props }: AppSidebarProps) => {
  const params = useParams();
  const storeId = params.storeId;

  const data = {
    navMain: [
      {
        title: 'Dashboard',
        url: `/home/${storeId}`,
        icon: Gauge,
      },
      {
        title: 'Categories',
        url: `/home/${storeId}/categories`,
        icon: Tag,
        isActive: true,
        items: [
          {
            title: 'All categories',
            url: `/home/${storeId}/categories`,
          },
          {
            title: 'New category',
            url: `/home/${storeId}/categories/new`,
          },
        ],
      },
      {
        title: 'Products',
        url: `/home/${storeId}/products`,
        icon: Package,
        isActive: true,
        items: [
          {
            title: 'All products',
            url: `/home/${storeId}/products`,
          },
          {
            title: 'New product',
            url: `/home/${storeId}/products/new`,
          },
        ],
      },
      {
        title: 'Orders',
        url: `/home/${storeId}/orders`,
        icon: ShoppingCart,
      },
      {
        title: 'Clients',
        url: `/home/${storeId}/clients`,
        icon: User,
      },
      {
        title: 'Settings',
        url: `/home/${storeId}/settings`,
        icon: Bolt,
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
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};
