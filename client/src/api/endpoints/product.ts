import { apiSlice } from "../apiSlice";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    createdAt: string;
    category: string;
    image: string | null;
}

interface ProductsResponse {
    products: Product[];
}

export interface CreateProductRequest {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string | null;
}

export interface UpdateProductRequest {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image?: File | null;
}

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<ProductsResponse, void>({
            query: () => '/api/products',
            providesTags: [{ type: 'Product', id: 'LIST' }],
        }),
        getProduct: builder.query<Product, number>({
            query: (id) => `/api/products/${id}`,
            providesTags: ['Product'],
        }),
        createProduct: builder.mutation<Product, FormData>({
            query: (formData) => ({
                url: '/api/products',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation<Product, FormData>({
            query: (formData) => {
                const id = formData.get("id");
                if (!id) {
                    throw new Error("Product ID is required for update");
                }
                return {
                    url: `/api/products/${id}`,
                    method: 'PUT',
                    body: formData,
                };
            },
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation<void, number>({
            query: (id) => ({
                url: `/api/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;
