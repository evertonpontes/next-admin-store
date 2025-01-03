'use client';

import { StoreDelete } from '@/components/store-delete';
import { StoreForm } from '@/components/store-form';
import { Modal } from '@/components/ui/modal';
import { useStoreModal } from '@/hooks/use-store-modal';
import { useEffect, useState } from 'react';

export const StoreModalContext = () => {
  const [isMounted, setMounted] = useState(false);
  const { isOpen, onOpen, onClose, action } = useStoreModal();

  function handleOpenChange(open: boolean) {
    if (open) {
      onOpen();
    } else {
      onClose();
    }
  }

  const dataMessage = {
    create: {
      title: 'Create Store',
      description: 'Enter the information bellow to create a new store.',
    },
    delete: {
      title: 'Delete Store',
      description:
        'Are you sure you want to delete this store? This action cannot be undone.',
    },
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      open={isOpen}
      onOpenChange={handleOpenChange}
      title={dataMessage[action].title}
      description={dataMessage[action].description}
    >
      {action === 'create' ? <StoreForm /> : <StoreDelete />}
    </Modal>
  );
};
