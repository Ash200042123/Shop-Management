import { getCookie } from '@/utils/cookie-utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface ApiResponse {
    message: string;
    orders: {
      orders: Order[];
    };
  }

export const orderSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: backendUrl,prepareHeaders: (headers) => {
        const token = getCookie();
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
  
        headers.set('Content-Type', 'application/json');
        return headers;
      }}),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: ()=>'/orders',
            transformResponse: (response: unknown) => {
                const data = response as ApiResponse;
                return data.orders.orders.map((order: Order) => ({
                  id: order.id,
                  customerName: order.customerName,
                  userId: order.userId,
                  orderDate: new Date(order.orderDate).toLocaleString(),
                  status: order.status,
                  products: order.products,
                //   orderTotal: order.orderTotal,
                  invoiceId: order.invoiceId,
                }));
              },
            providesTags: ['Orders']
        }),
        createOrder:builder.mutation({
            query: (order) => ({
                url: '/create-order',
                method: 'POST',
                body: order
            }),
            invalidatesTags: ['Orders']
        }),
        updateOrder:builder.mutation({
            query: (order) => ({
                url: `/orders`,
                method: 'PUT',
                body: order
            }),
            invalidatesTags: ['Orders']
        }),
        getOrder:builder.query({
          query: (orderId)=>`/orders/${orderId}`,
        })
    })
})



export const { useGetOrdersQuery, useCreateOrderMutation, useUpdateOrderMutation, useGetOrderQuery } = orderSlice;