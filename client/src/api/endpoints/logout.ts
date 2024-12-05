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
                    // Attendre la réponse de l'API
                    await queryFulfilled;
                    // Nettoyer le token local
                    localStorage.removeItem('token');
                    console.log('Déconnexion réussie, token supprimé.');
                } catch (error) {
                    console.error('Erreur lors de la déconnexion:', error);
                }
            },
            invalidatesTags: [{ type: 'Logout', id: 'STATUS' }], // Invalider les tags Auth pour forcer une mise à jour
        }),
    }),
});

export const { useLogoutMutation } = authApi;
