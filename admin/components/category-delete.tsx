'use client';

import { Button } from '@/components/ui/button';
import { useCategoryModal } from '@/hooks/use-category-modal';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const CategoryDelete = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { onClose, categoryId, onCategoryId } = useCategoryModal();
  const params = useParams();
  const { storeId } = params;

  const router = useRouter();

  async function handleDelete() {
    setIsLoading(true);
    try {
      await axios.delete(`/api/stores/${storeId}/categories/${categoryId}`);
      toast.success('Category deleted successfully!');
      onClose();
      router.push(`/home/${storeId}/categories/`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleClose() {
    onCategoryId('');
    onClose();
  }

  return (
    <div className="w-full max-w-xs flex items-center gap-2 mx-auto">
      <Button
        variant="destructive"
        className="flex-1"
        disabled={isLoading}
        onClick={handleDelete}
      >
        {isLoading ? 'Deleting...' : 'Delete'}
      </Button>
      <Button
        variant="outline"
        className="flex-1"
        disabled={isLoading}
        onClick={handleClose}
      >
        Cancel
      </Button>
    </div>
  );
};
