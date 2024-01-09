import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import authSlice from "@/features/slice/auth/v1/authSlice";
import userSlice from "@/features/slice/user/userSlice";
import imageOwnerSlice from "@/features/slice/user/profilePicOwnerSlice";
import authSlice2 from "@/features/slice/auth/v2/auth-v2Slice";
import { apiSlice } from "@/features/slice/auth/v2/apiSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    authV2: authSlice2,
    user: userSlice,
    picOwner: imageOwnerSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Adding the api middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
