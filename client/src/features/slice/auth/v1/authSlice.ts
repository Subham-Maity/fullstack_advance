import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { verifyPassword } from "@/api/auth/Login/login";
import { AuthState } from "@/types/reduxSlice/auth/auth.type";
import Cookies from "js-cookie";

const initialState: AuthState = {
  status: "idle",
  accessToken: "", // Initial value for accessToken
};

// Login API call
export const fetchLoginAsync = createAsyncThunk(
  "auth/fetchLogin",
  async (data: { username: string; password: string }) => {
    const response: any = await verifyPassword(data);

    // Save the refresh token in a secure HttpOnly cookie
    Cookies.set("refreshToken", response.data.refreshToken, {
      secure: true,
      httpOnly: true,
    });

    // Return only the accessToken to the fulfilled action
    return response.data.accessToken;
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      // Action to set the accessToken
      state.accessToken = action.payload;
    },
    logout: (state) => {
      // Action to log out the user
      state.accessToken = ""; // Reset the accessToken
    },
  },

  // Actions for API call
  extraReducers: (builder) => {
    builder.addCase(fetchLoginAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchLoginAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.accessToken = action.payload; // Set the accessToken
    });
    builder.addCase(fetchLoginAsync.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { logout } = authSlice.actions;
export const { setAccessToken } = authSlice.actions;

export default authSlice.reducer;

export const selectAccessToken = (state: any) => state.auth.accessToken;
