import { getCookie } from "@/utils/cookie-utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendUrl= import.meta.env.VITE_BACKEND_URL;

interface ApiResponse {
  users: User[];
}

export const employeeSlice = createApi({
    reducerPath: 'employeeApi',
    baseQuery: fetchBaseQuery({baseUrl:backendUrl,prepareHeaders: (headers) => {
        const token = getCookie();
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
  
        headers.set('Content-Type', 'application/json');
        return headers;
      }}),
    tagTypes: ['Employees','Employee'],
    endpoints: (builder)=>({
        getEmployees: builder.query({
            query: ()=>'/employees',
            transformResponse: (response: unknown) => {
              const data = response as ApiResponse;
              return data.users.map((employee: any) => ({
                id: employee.id,
                email: employee.email,
                name: employee.name,
                role: employee.role,
                unitsSold: employee.unitsSold,
              }));
            },
            providesTags: ['Employees']
        }),
        getEmployee:builder.query({
          query: (employeeId)=>`/user/${employeeId}`,
          providesTags: ['Employee']
        }),
        updateEmployee:builder.mutation({
          query: ({employeeId, email}) => ({
              url: `/user/${employeeId}`,
              method: 'PUT',
              body: {email}
          }),
          invalidatesTags: ['Employees', 'Employee']
      }),
        deleteEmployee: builder.mutation({
          query: (id) => ({
            url: `/employees/${id}`,
            method: 'DELETE'
          }),
          invalidatesTags: ['Employees','Employee']
        })
    })
})



export const {useGetEmployeesQuery, useDeleteEmployeeMutation, useGetEmployeeQuery, useUpdateEmployeeMutation} = employeeSlice