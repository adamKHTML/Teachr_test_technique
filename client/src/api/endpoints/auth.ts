import { apiSlice } from "../apiSlice";

interface LoginRequest {
    email: string;
    password: string;

}

interface LoginResponse {
    token: string;
}

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/api/login_check',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (response: LoginResponse) => {
                if (response.token) {
                    localStorage.setItem('token', response.token);
                    console.log('Token saved in localStorage', localStorage);
                }
                return response;
            },
            invalidatesTags: [{ type: 'Auth', id: 'STATUS' }],
        }),
    }),
});

export const { useLoginMutation } = authApi;
