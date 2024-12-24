'use client';

import { Store } from '@prisma/client';
import { useStoreModal } from '@/hooks/use-store-modal';

import React, { useEffect, useState } from 'react';

import { Modal } from '@/components/modal';
import { Button } from '@/components/ui/button';
import { TypographyH3, TypographyMuted } from '@/components/ui/typography';
import { DataTable } from '@/components/ui/data-table';

import { DeleteStore, StoreForm } from './store-form';
import { columns } from './columns';

interface StoreClientProps {
  stores: Store[];
}

export const StoreClient = ({ stores }: StoreClientProps) => {
  const { isOpen, onOpen, onClose } = useStoreModal();

  const handleOpenChange = () => {
    if (!isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between w-full p-4">
        <div>
          <TypographyH3>Stores</TypographyH3>
          <TypographyMuted>
            Create a new store to start selling your products.
          </TypographyMuted>
        </div>
        <Button onClick={handleOpenChange} size={'sm'}>
          New store
        </Button>
      </div>
      <div className="p-4 pt-0">
        <StoreModal />
        <DataTable
          columns={columns}
          data={stores}
          placeholder="Search for a store"
        />
      </div>
    </div>
  );
};

export const StoreModal = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { isOpen, onOpen, onClose, command, setCommand } = useStoreModal();

  const handleOpenChange = (open: boolean) => {
    setCommand('create');

    if (open) {
      onOpen();
    } else {
      onClose();
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {command === 'create' && (
        <Modal
          open={isOpen}
          onOpenChange={handleOpenChange}
          title="Create store"
          description="Create a new store to start selling your products. Fill out the information below."
        >
          <StoreForm />
        </Modal>
      )}
      {command === 'update' && (
        <Modal
          open={isOpen}
          onOpenChange={handleOpenChange}
          title="Update store"
          description="Update your store information."
        >
          <StoreForm />
        </Modal>
      )}
      {command === 'delete' && (
        <Modal
          open={isOpen}
          onOpenChange={handleOpenChange}
          title="Delete store"
          description="Are you sure you want to delete this store? This action cannot be undone."
        >
          <DeleteStore />
        </Modal>
      )}
    </>
  );
};
