import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useAppStore = create()(
    devtools((set) => ({
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

        accountView: 0,
        setAccountView: (view) => {
            set(() => ({
                accountView: view,
            }));
        },

        selectRole: false,
        setSelectRole: (select) => {
            set(() => ({
                selectRole: select,
            }));
        },

        search: {
            name: -1,
            category_id: -1,
            min_price: 0,
            max_price: 10000,
        },
        setSearch: (data) => {
            set(() => ({
                search: data,
            }));
        },

        cart: [],
        setCart: (data) => {
            set((state) => ({
                cart: [...state.cart, data],
            }));
        },
        removeFromCart: (product_id) => {
            set((state) => ({
                cart: state.cart.filter(
                    (item) => item.product_id !== product_id
                ),
            }));
        },
    }))
);
