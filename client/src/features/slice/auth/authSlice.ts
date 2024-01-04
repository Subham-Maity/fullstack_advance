import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { verifyPassword } from "@/api/auth/Login/login";
import { AuthState } from "@/types/reduxSlice/auth/auth.type";

const initialState: AuthState = {
  username: "",
  status: "idle",
};

//Login Api call
export const fetchLoginAsync = createAsyncThunk(
  "auth/fetchLogin",
  async (data: { username: string; password: string }) => {
    const response = await verifyPassword(data);
    return response.data;
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //This is the action for setting the username
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },

  //This is the action for api call
  extraReducers: (builder) => {
    builder.addCase(fetchLoginAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchLoginAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.username = action.payload.username;
    });
    builder.addCase(fetchLoginAsync.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { setUsername } = authSlice.actions;

export default authSlice.reducer;
