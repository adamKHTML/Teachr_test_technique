import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: (builder) => ({
        getUserInfo: builder.query({
            query: () => ({
                url: '/api/me',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
        }),
    }),
});

export const { useGetUserInfoQuery } = userApi;
