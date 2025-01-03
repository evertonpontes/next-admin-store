'use client';

import { Button } from '@/components/ui/button';
import { useStoreModal } from '@/hooks/use-store-modal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const StoreDelete = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { onClose, storeId, onStoreId } = useStoreModal();

  const router = useRouter();

  async function handleDelete() {
    setIsLoading(true);
    try {
      await axios.delete(`/api/stores/${storeId}`);
      toast.success('Store deleted successfully!');
      onClose();
      router.push('/home');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleClose() {
    onStoreId('');
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
