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
        updateProductsStoreStock: (product_id, stock) => {
            set((state) => ({
                productsStore: state.productsStore.map((prod) =>
                    prod.product_id === product_id ? { ...prod, stock } : prod
                ),
            }));
        },
        updateProductsStore: (product) => {
            set((state) => ({
                productsStore: state.productsStore.map((prod) =>
                    prod.product_id === product.product_id ? product : prod
                ),
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
