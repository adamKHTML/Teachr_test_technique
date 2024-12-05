import { apiSlice } from "../apiSlice";

export interface Category {
    id: number;
    name: string;
}

export interface CategoryResponse {
    categories: Category[];
}

export interface CreateCategoryRequest {
    name: string;
}

export interface UpdateCategoryRequest {
    id: number;
    name: string;
}

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<CategoryResponse, void>({
            query: () => '/api/categories',
            providesTags: [{ type: 'Category', id: 'LIST' }],
        }),
        createCategory: builder.mutation<void, CreateCategoryRequest>({
            query: (body) => ({
                url: '/api/categories',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Category', id: 'LIST' }],
        }),
        updateCategory: builder.mutation<void, UpdateCategoryRequest>({
            query: ({ id, name }) => ({
                url: `/api/categories/${id}`,
                method: 'PUT',
                body: { name },
            }),
            invalidatesTags: [{ type: 'Category', id: 'LIST' }],
        }),
        deleteCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `/api/categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Category', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi;
