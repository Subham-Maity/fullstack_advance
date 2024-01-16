import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { verifyPassword } from "@/api/auth/Login/login";
import { BASE_URL } from "@/constants";
import Cookies from "js-cookie";
import { store } from "@/store/redux/store";
import { selectAccessToken } from "@/features/slice/auth/v1/authSlice"; // Import js-cookie

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
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/token",
        method: "POST",
        body: { refreshToken: Cookies.get("refreshToken") },
      }),
    }),
    updateUser: builder.mutation({
      query: (response) => {
        // Get the access token from the Redux store
        const accessToken = selectAccessToken(store.getState());

        return {
          url: "/updateuser",
          method: "PUT",
          body: response,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useUpdateUserMutation,
} = apiSlice;
