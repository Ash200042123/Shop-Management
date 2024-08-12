import { getCookie } from "@/utils/cookie-utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendUrl= import.meta.env.VITE_BACKEND_URL;


interface ApiResponse {
  invoices: Invoice[];
}

export const invoiceSlice = createApi({
    reducerPath: 'invoiceApi',
    baseQuery: fetchBaseQuery({baseUrl:backendUrl,prepareHeaders: (headers) => {
        const token = getCookie();
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
  
        headers.set('Content-Type', 'application/json');
        return headers;
      }}),
    tagTypes: ['Invoices'],
    endpoints: (builder)=>({
        getInvoices: builder.query({
            query: ()=>'/invoices',
            transformResponse: (response: unknown) => {
              const data = response as ApiResponse;
              return data.invoices.map((invoice: any) => ({
                id: invoice.id,
                userId: invoice.userId,
                orderId: invoice.orderId,
                invoiceDate: new Date(invoice.invoiceDate),
                totalAmount: invoice.totalAmount,
              }));
            },
            providesTags: ['Invoices']
        }),
        deleteInvoice: builder.mutation({
          query: ( id)  => ({
              url: `/invoices/${id}`,
              method: 'DELETE',
          }),
          invalidatesTags: ['Invoices']
      }),
      getInvoice: builder.query({
        query: (invoiceId) => `/invoices/${invoiceId}`
      })
    })
})



export const {useGetInvoicesQuery, useDeleteInvoiceMutation, useGetInvoiceQuery} = invoiceSlice