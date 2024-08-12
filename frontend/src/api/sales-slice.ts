import { getCookie } from "@/utils/cookie-utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendUrl= import.meta.env.VITE_BACKEND_URL;

interface ApiResponse {
  sales: Sale[];
}

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
    tagTypes: ['Sales'],
    endpoints: (builder)=>({
        getSalesDetails: builder.query({
            query: ()=>'/sales/details',
            transformResponse: (response: unknown) => {
              const data = response as ApiResponse;
              return data.sales.map((sale: any) => ({
                id: sale.id,
                userId: sale.userId,
                productId: sale.productId,
                saleDate: new Date(sale.saleDate),
                productName: sale.productName,
                totalPrice: sale.totalPrice,
                quantity: sale.quantity,
              }));
            },
            providesTags: ['Sales']
        }),
        getSalesSummary: builder.query({
          query: ()=>'/sales',
        }),
        getWeeklySales: builder.query({
          query: ()=>'/sales/week'
        }),
        getMonthlySales: builder.query({
          query: ()=>'/sales/month'
        })
    })
})



export const {useGetSalesDetailsQuery, useGetSalesSummaryQuery, useGetWeeklySalesQuery, useGetMonthlySalesQuery} = salesSlice