import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import userSlice from "@/features/slice/user/userSlice";
import imageOwnerSlice from "@/features/slice/user/profilePicOwnerSlice";
import authSlice2 from "@/features/slice/auth/v2/auth-v2Slice";
import { apiSlice } from "@/features/slice/auth/v2/apiSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken"],
};
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice2);
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    user: userSlice,
    picOwner: imageOwnerSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Adding the api middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
