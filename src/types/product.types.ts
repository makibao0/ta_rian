export interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    stock: number;
    category: string;
    description: string;
    images?: string[];
}

export interface ProductResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}
