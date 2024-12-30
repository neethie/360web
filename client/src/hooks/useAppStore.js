import { create } from "zustand";

export const useAppStore = create((set) => ({
    authForm: 0,
    setAuthForm: (form) => {
        set(() => ({
            authForm: form,
        }));
    },

    mobileMenu: 0,
    setMobileMenu: (menu) => {
        set(() => ({
            mobileMenu: menu,
        }));
    },
}));
