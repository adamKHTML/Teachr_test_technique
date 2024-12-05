import { apiSlice } from "../apiSlice";

interface Category {
    id: number;
    name: string;
}

interface CategoryResponse {
    categories: Category[];
}

interface CreateCategoryRequest {
    name: string;
}

interface UpdateCategoryRequest {
    id: number;
    name: string;
}



export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<CategoryResponse, void>({
            query: () => '/api/categories',
            providesTags: [{ type: 'Category', id: 'LIST' }],
        }),
        createCategory: builder.mutation<Category, CreateCategoryRequest>({
            query: (categoryData) => ({
                url: '/api/categories',
                method: 'POST',
                body: categoryData,
            }),
            invalidatesTags: ['Category'],
        }),
        updateCategory: builder.mutation<Category, UpdateCategoryRequest>({
            query: (categoryData) => ({
                url: `/api/categories/${categoryData.id}`,
                method: 'PUT',
                body: categoryData,
            }),
            invalidatesTags: ['Category'],
        }),
        deleteCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `/api/categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi;
