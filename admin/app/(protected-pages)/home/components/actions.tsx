'use client';

import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Store } from '@prisma/client';
import { useStoreModal } from '@/hooks/use-store-modal';

export const Actions = ({ store }: { store: Store }) => {
  const { isOpen, onOpen, onClose, setCommand, setStoreId } = useStoreModal();

  const handleDeleteStore = (open: boolean) => {
    setStoreId(store.id);
    setCommand('delete');
    if (open) {
      onOpen();
    } else {
      setStoreId(null);
      onClose();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(store.id)}
        >
          Copy store ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Update store</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDeleteStore(!isOpen)}>
          Delete store
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
