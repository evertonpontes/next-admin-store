import { create } from 'zustand';

type UseStoreModalType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  command: 'create' | 'update' | 'delete';
  setCommand: (command: 'create' | 'update' | 'delete') => void;
  storeId: string | null;
  setStoreId: (storeId: string | null) => void;
};

export const useStoreModal = create<UseStoreModalType>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  command: 'create',
  setCommand: (command) => set({ command }),
  storeId: null,
  setStoreId: (storeId) => set({ storeId }),
}));
