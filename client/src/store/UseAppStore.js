import { create } from "zustand";

export const useAppStore = create((set) => ({
    overlay: 0,

    mobileAdmin: false,
    setMobileAdmin: (status) => {
        set(() => ({
            mobileAdmin: status,
        }));
    },

    panelModal: 0,
    setPanelModal: (panel) => {
        set(() => ({
            panelModal: panel,
            overlay: panel != 0 ? 1 : 0,
        }));
    },

    authForm: 0,
    setAuthForm: (form) => {
        set(() => ({
            authForm: form,
        }));
    },
}));
