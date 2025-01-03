import { create } from 'zustand';

interface CategoryModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  categoryId?: string;
  onCategoryId: (id: string) => void;
}

export const useCategoryModal = create<CategoryModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  categoryId: undefined,
  onCategoryId: (id: string) => set({ categoryId: id }),
}));
