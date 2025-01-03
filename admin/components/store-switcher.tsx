'use client';

import { ChevronsUpDown, Plus, Store } from 'lucide-react';
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
import { StoreSchema } from '@/types/schema';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useStoreModal } from '@/hooks/use-store-modal';

export const StoreSwitcher = ({ stores }: { stores: StoreSchema[] }) => {
  const params = useParams();
  const { isMobile } = useSidebar();
  const [activeStore, setActiveStore] = useState<StoreSchema | null>(null);
  const { isOpen, onOpen, onClose, onAction } = useStoreModal();

  function handleOpenChange(open: boolean) {
    if (open) {
      onAction('create');
      onOpen();
    } else {
      onClose();
    }
  }

  useEffect(() => {
    if (params.storeId) {
      setActiveStore(
        stores.find((store) => store.id === params.storeId) || null
      );
    }
  }, [stores, params.storeId]);

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
                <Store className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeStore?.name}
                </span>
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
              Stores
            </DropdownMenuLabel>
            {stores.map((store, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => setActiveStore(store)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Store className="size-4 shrink-0" />
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
};
