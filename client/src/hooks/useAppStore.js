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
            max_price: 500,
        },
        setSearch: (data) => {
            set(() => ({
                search: data,
            }));
        },

        cart: [],
        addToCart: (product) => {
            set((state) => ({
                cart: [...state.cart, product],
            }));
        },
        updateQuantity: (product_id, quantity) => {
            set((state) => ({
                cart: state.cart.map((item) =>
                    item.product_id === product_id
                        ? { ...item, quantity }
                        : item
                ),
            }));
        },
        updateCart: (product) => {
            set((state) => ({
                cart: state.cart.map((item) => {
                    item.product_id === product.product_id ? product : item;
                }),
            }));
        },
        removeFromCart: (product_id) => {
            set((state) => ({
                cart: state.cart.filter(
                    (item) => item.product_id !== product_id
                ),
            }));
        },
        resetCart: () => {
            set(() => ({
                cart: [],
            }));
        },

        cartTemp: [],
        addToCartTemp: (product) => {
            set((state) => ({
                cartTemp: [...state.cartTemp, product],
            }));
        },
        updateQuantityTemp: (product_id, quantity) => {
            set((state) => ({
                cartTemp: state.cartTemp.map((item) =>
                    item.product_id === product_id
                        ? { ...item, quantity }
                        : item
                ),
            }));
        },
        updateCartTemp: (product) => {
            set((state) => ({
                cartTemp: state.cartTemp.map((item) => {
                    item.product_id === product.product_id ? product : item;
                }),
            }));
        },
        removeFromCartTemp: (product_id) => {
            set((state) => ({
                cartTemp: state.cartTemp.filter(
                    (item) => item.product_id !== product_id
                ),
            }));
        },
        resetCartTemp: () => {
            set(() => ({
                cartTemp: [],
            }));
        },
    }))
);
