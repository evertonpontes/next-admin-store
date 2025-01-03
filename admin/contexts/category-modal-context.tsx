'use client';

import { CategoryDelete } from '@/components/category-delete';
import { Modal } from '@/components/ui/modal';
import { useCategoryModal } from '@/hooks/use-category-modal';
import { useEffect, useState } from 'react';

export const CategoryModalContext = () => {
  const [isMounted, setMounted] = useState(false);
  const { isOpen, onOpen, onClose } = useCategoryModal();

  function handleOpenChange(open: boolean) {
    if (open) {
      onOpen();
    } else {
      onClose();
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      open={isOpen}
      onOpenChange={handleOpenChange}
      title="Delete Category"
      description="Are you sure you want to delete this category? This action cannot be undone."
    >
      <CategoryDelete />
    </Modal>
  );
};
