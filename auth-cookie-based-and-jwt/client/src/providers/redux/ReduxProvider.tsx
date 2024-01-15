"use client";
import React from "react";

/* Core */
import { Provider } from "react-redux";
import { persistor, store } from "@/store/redux/store";
import { PersistGate } from "redux-persist/integration/react";

/* Instruments */

export const ReduxProvider = (props: React.PropsWithChildren) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  );
};
