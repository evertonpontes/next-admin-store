'use client';

import React, { useCallback, useEffect, useState } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { StoreSwitcher } from '@/components/store-switcher';
import axios from 'axios';
import {
  Gauge,
  Package,
  Settings,
  ShoppingBasket,
  Tag,
  Users,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Store } from '@/models/store';

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const [stores, setStores] = useState<Store[]>([]);
  const params = useParams();
  const { storeId } = params;

  const data = {
    navMain: [
      {
        title: 'Dashboard',
        href: `/home/${storeId}`,
        icon: Gauge,
      },
      {
        title: 'Categories',
        href: `/home/${storeId}/categories`,
        isActive: true,
        icon: Tag,
        items: [
          {
            title: 'All categories',
            href: `/home/${storeId}/categories`,
          },
          {
            title: 'Create category',
            href: `/home/${storeId}/categories/new`,
          },
        ],
      },
      {
        title: 'Products',
        href: `/home/${storeId}/products`,
        isActive: true,
        icon: Package,
        items: [
          {
            title: 'All products',
            href: `/home/${storeId}/products`,
          },
          {
            title: 'Create product',
            href: `/home/${storeId}/products/new`,
          },
        ],
      },
      {
        title: 'Orders',
        href: `/home/${storeId}/orders`,
        icon: ShoppingBasket,
      },
      {
        title: 'Customers',
        href: `/home/${storeId}/customers`,
        icon: Users,
      },
      {
        title: 'Settings',
        href: `/home/${storeId}/settings`,
        isActive: false,
        icon: Settings,
        items: [
          {
            title: 'Store settings',
            href: `/home/${storeId}/settings`,
          },
          {
            title: 'Account',
            href: '/account',
          },
        ],
      },
    ],
  };

  const fetchStores = useCallback(async () => {
    try {
      const response = await axios.get<Store[]>('/api/stores/');
      setStores(response.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching stores');
    }
  }, []);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <StoreSwitcher stores={stores} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
