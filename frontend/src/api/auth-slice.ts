
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const authSlice = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: backendUrl}),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credential)=>({
                url: '/login',
                method: 'POST',
                body: credential
            }),
            invalidatesTags: ['Auth'],
        }),
        signup: builder.mutation({
            query: (formData)=>({
                url: '/signup',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['Auth'],
        }),

    })
})


export const {useLoginMutation, useSignupMutation} = authSlice;