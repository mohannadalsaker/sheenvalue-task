import { create } from "zustand";

type DialogStore = {
  isOpenAdd: boolean;
  openEditId: number | null;
  openDeleteId: number | null;
  toggleOpenAdd: () => void;
  changeOpenEdit: (id: number | null) => void;
  changeOpenDelete: (id: number | null) => void;
};

export const useDialogStore = create<DialogStore>((set) => ({
  isOpenAdd: false,
  openEditId: null,
  openDeleteId: null,
  toggleOpenAdd: () => {
    set((state) => ({
      isOpenAdd: !state.isOpenAdd,
    }));
  },
  changeOpenDelete: (id: number | null) => {
    set(() => ({
      openDeleteId: id,
    }));
  },
  changeOpenEdit: (id: number | null) => {
    set(() => ({
      openEditId: id,
    }));
  },
}));
