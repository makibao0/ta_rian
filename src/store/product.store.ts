import { create } from "zustand";
import type { Product } from "../types/product.types";
import { productController } from "../controllers/product.controller";


interface ProductState {
    products: Product[];
    total: number;
    loading: boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    fetchProducts: (limit: number, skip: number, query?: string) => Promise<void>;
    updateProduct: (id: number, payload: Partial<Product>) => Promise<boolean>;
    deleteProduct: (id: number) => Promise<boolean>;
}

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    total: 0,
    loading: false,
    searchQuery: "",

    setSearchQuery: (query) => set({ searchQuery: query }),

    fetchProducts: async (limit, skip, query = "") => {
        set({ loading: true });
        try {
            const data = await productController.getProducts(limit, skip, query);
            set({ products: data.products, total: data.total, loading: false });
        } catch {
            set({ loading: false });
        }
    },
    updateProduct: async (id, payload) => {
        try {
            await productController.updateProduct(id, payload);
            const updatedProducts = get().products.map(p =>
                p.id === id ? { ...p, ...payload } : p
            );
            set({ products: updatedProducts });
            return true;
        } catch { return false; }
    },

    deleteProduct: async (id) => {
        try {
            await productController.deleteProduct(id);
            set({ products: get().products.filter(p => p.id !== id) });
            return true;
        } catch { return false; }
    }
}));