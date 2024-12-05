import { apiSlice } from "../apiSlice";

interface Module {
    id: number;
    title: string;
    description: string;
    createdAt: string;
}

interface ModulesResponse {
    modules: Module[];
}

export const modulesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getModules: builder.query<ModulesResponse, void>({
            query: () => '/api/modules',
            providesTags: [{ type: 'Modules', id: 'LIST' }],
        }),
    }),
});

export const { useGetModulesQuery } = modulesApi;
