import { create } from 'zustand';

interface ModalState {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  setIsModalOpen: (isOpen) => set(() => ({ isModalOpen: isOpen })),
}));

export default useModalStore;
