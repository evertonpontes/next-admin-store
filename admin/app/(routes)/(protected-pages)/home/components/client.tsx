'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useStoreModal } from '@/hooks/use-store-modal';
import axios from 'axios';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '@home/components/columns';
import { Store } from '@/models/store';

export const StoreTable = () => {
  const { onOpen, onClose, isOpen, onAction } = useStoreModal();
  const [stores, setStores] = useState<Store[]>([]);

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

  function handleOpenChange(open: boolean) {
    if (open) {
      onAction('create');
      onOpen();
    } else {
      onClose();
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={() => handleOpenChange(!isOpen)} size={'sm'}>
        New store
      </Button>
      <DataTable columns={columns} data={stores} />
    </div>
  );
};
