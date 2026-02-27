import { api } from "../services/api";
import type { Product, ProductResponse } from "../types/product.types";


export const productController = {

    getProducts: async (limit: number = 10, skip: number = 0, query: string = ""): Promise<ProductResponse> => {
        const endpoint = query ? "/products/search" : "/products";
        const { data } = await api.get<ProductResponse>(endpoint, {
            params: {
                limit,
                skip,
                q: query,
                select: "title,price,thumbnail,stock,category"
            }
        });
        return data;
    },
    getProductById: async (id: number): Promise<Product> => {
        const { data } = await api.get<Product>(`/products/${id}`);
        return data;
    },

    updateProduct: async (id: number, payload: Partial<Product>): Promise<Product> => {
        const { data } = await api.put<Product>(`/products/${id}`, payload);
        return data;
    },

    deleteProduct: async (id: number): Promise<void> => {
        await api.delete(`/products/${id}`);
    }
};