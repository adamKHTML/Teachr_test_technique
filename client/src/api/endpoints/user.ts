import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Créer l'API pour récupérer les informations de l'utilisateur
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }), // Remplacez par l'URL de votre API
    endpoints: (builder) => ({
        getUserInfo: builder.query({
            query: () => ({
                url: '/api/me', // L'endpoint pour récupérer les données de l'utilisateur
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Utilisez le token stocké dans le localStorage
                },
            }),
        }),
    }),
});

export const { useGetUserInfoQuery } = userApi;
