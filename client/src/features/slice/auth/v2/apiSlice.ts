import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { verifyPassword } from "@/api/auth/Login/login";
import { BASE_URL } from "@/constants";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/v2` }),
  endpoints: (builder) => ({
    login: builder.mutation({
      queryFn: async (credentials) => {
        try {
          const response: any = await verifyPassword(credentials);
          return { data: response.data };
        } catch (error: any) {
          return { error: error.message };
        }
      },
    }),
    updateUser: builder.mutation({
      query: (response) => ({
        url: "/updateuser",
        method: "PUT",
        body: response,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useUpdateUserMutation } = apiSlice;
