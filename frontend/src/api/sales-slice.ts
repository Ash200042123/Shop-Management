import { getCookie } from "@/utils/cookie-utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendUrl= import.meta.env.VITE_BACKEND_URL;

export const salesSlice = createApi({
    reducerPath: 'salesApi',
    baseQuery: fetchBaseQuery({baseUrl:backendUrl,prepareHeaders: (headers) => {
        const token = getCookie();
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
  
        headers.set('Content-Type', 'application/json');
        return headers;
      }}),
    tagTypes: ['Product'],
    endpoints: (builder)=>({
        getProducts: builder.query({
            query: ()=>'/products',
            providesTags: ['Product']
        })
    })
})



export const {useGetProductsQuery} = salesSlice