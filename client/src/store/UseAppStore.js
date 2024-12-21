import { create } from "zustand";

export const useAppStore = create((set) => ({
    overlay: 0,

    panelModal: 0,
    setPanelModal: (panel) => {
        set(() => ({
            panelModal: panel,
            overlay: panel != 0 ? 1 : 0,
        }));
    },
}));
