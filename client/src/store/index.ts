import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { authApi } from '../api/endpoints/auth';
import { productApi } from '../api/endpoints/product';
import { categoryApi } from '../api/endpoints/category';
import authReducer from './slices/authSlice';
import { userApi } from '../api/endpoints/user';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            apiSlice.middleware,
            authApi.middleware,
            productApi.middleware,
            categoryApi.middleware,
            userApi.middleware,

        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
