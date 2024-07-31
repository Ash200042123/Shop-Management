import { getCookie } from "@/utils/cookie-utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface ApiResponse {
  products: Product[];
}

export const productSlice = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: backendUrl,
    prepareHeaders: (headers) => {
      const token = getCookie();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Products",'Product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      transformResponse: (response: unknown) => {
        const data = response as ApiResponse;
        return data.products.map((product: any) => ({
          productId: product.id,
          productName: product.name,
          description: product.description,
          productPrice: product.price,
          quantity: product.stock,
        }));
      },
      providesTags: ["Products"],
    }),
    addProduct:builder.mutation({
        query: (product) => ({
            url: '/add-product',
            method: 'POST',
            body: product
        }),
        invalidatesTags: ['Products']
    }),
    updateProduct:builder.mutation({
        query: ({name, product}) => ({
            url: `/products/${name}`,
            method: 'PUT',
            body: product
        }),
        invalidatesTags: ['Products', 'Product']
    }),
    deleteProduct: builder.mutation({
        query: ({ name }) => ({
            url: `/products/${name}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Products','Product']
    }),
    getProduct:builder.query({
        query: (productName)=>`/products/${productName}`,
        providesTags: ['Product']
      })
  }),
});

export const { useGetProductsQuery,useAddProductMutation,useUpdateProductMutation,useDeleteProductMutation, useGetProductQuery } = productSlice;
