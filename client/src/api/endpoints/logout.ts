import { apiSlice } from "../apiSlice";

interface LogoutResponse {
    message: string;
}

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        logout: builder.mutation<LogoutResponse, void>({
            query: () => ({
                url: '/api/logout',
                method: 'POST',
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {

                    await queryFulfilled;

                    localStorage.removeItem('token');
                    console.log('Déconnexion réussie, token supprimé.');
                } catch (error) {
                    console.error('Erreur lors de la déconnexion:', error);
                }
            },
            invalidatesTags: [{ type: 'Logout', id: 'STATUS' }],
        }),
    }),
});

export const { useLogoutMutation } = authApi;
