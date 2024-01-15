import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/types/reduxSlice/auth/auth.type";
import Cookies from "js-cookie";
import { apiSlice } from "@/features/slice/auth/v2/apiSlice"; // Import your apiSlice

const initialState: AuthState = {
  status: "idle",
  accessToken: "", // Initial value for accessToken
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.accessToken = "";
      Cookies.remove("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(apiSlice.endpoints.login.matchPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(apiSlice.endpoints.login.matchFulfilled, (state, action) => {
        state.status = "succeeded";
        state.accessToken = action.payload.accessToken;
      })
      .addMatcher(apiSlice.endpoints.login.matchRejected, (state) => {
        state.status = "failed";
      })
      .addMatcher(
        apiSlice.endpoints.refreshToken.matchFulfilled,
        (state, action) => {
          state.accessToken = action.payload.accessToken;
        },
      )
      .addMatcher(apiSlice.endpoints.updateUser.matchPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(apiSlice.endpoints.updateUser.matchFulfilled, (state) => {
        state.status = "succeeded";
      })
      .addMatcher(apiSlice.endpoints.updateUser.matchRejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setAccessToken, logout } = authSlice.actions;

export default authSlice.reducer;
