'use client';

import * as React from 'react';
import { ChevronsUpDown, Plus, StoreIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Store } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import { useStoreModal } from '@/hooks/use-store-modal';

export function StoreSwitcher({ stores }: { stores: Store[] }) {
  const params = useParams();
  const { isMobile } = useSidebar();
  const [activeStore, setActiveStore] = React.useState(
    stores.find((store) => store.id === params.storeId || '')
  );

  const { isOpen, onOpen, onClose, setCommand } = useStoreModal();
  const route = useRouter();

  const handleOpenChange = (open: boolean) => {
    setCommand('create');

    if (open) {
      onOpen();
    } else {
      onClose();
    }
  };

  const handleSwitchStore = (store: Store) => {
    setActiveStore(store);
    route.push(`/home/${store.id}`);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <StoreIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeStore?.name}
                </span>
                <span className="truncate text-xs">{activeStore?.slug}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              stores
            </DropdownMenuLabel>
            {stores.map((store, index) => (
              <DropdownMenuItem
                key={store.name}
                onClick={() => handleSwitchStore(store)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <StoreIcon className="size-4 shrink-0" />
                </div>
                {store.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => handleOpenChange(!isOpen)}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add store</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
