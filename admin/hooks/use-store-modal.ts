import { create } from 'zustand';

interface StoreModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  action: 'create' | 'delete';
  onAction: (action: 'create' | 'delete') => void;
  storeId?: string;
  onStoreId: (id: string) => void;
}

export const useStoreModal = create<StoreModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  action: 'create',
  onAction: (action: 'create' | 'delete') => set({ action }),
  storeId: undefined,
  onStoreId: (id: string) => set({ storeId: id }),
}));
