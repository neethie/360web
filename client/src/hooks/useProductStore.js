import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useProductStore = create()(
    devtools((set) => ({
        productsStore: [],
        // Producto individual
        addProductsStore: (product) => {
            set((state) => ({
                productsStore: [...state.productsStore, product],
            }));
        },
        // Productos general
        setProductsStore: (products) => {
            set(() => ({
                productsStore: products,
            }));
        },
        removeProductsStore: (product_id) => {
            set((state) => ({
                productsStore: state.productsStore.filter(
                    (prod) => prod.product_id !== product_id
                ),
            }));
        },
    }))
);
