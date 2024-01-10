/**

import {default as jwt_decode} from "jwt-decode";
import { selectAccessToken } from "@/features/slice/auth/v1/authSlice";
import { store } from "@/store/redux/store";

export async function getUsername() {
  const token = selectAccessToken(store.getState());

  if (!token) {
    throw new Error("Cannot find Token");
  }

  try {
    return jwt_decode(token);
  } catch (error) {
    console.error("Failed to decode token", error);
    throw error;
  }
}
*/
import { selectAccessToken } from "@/features/slice/auth/v1/authSlice";
import { store } from "@/store/redux/store";

function parseJwt(token: any) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  return JSON.parse(jsonPayload);
}
export async function getUsername() {
  const token = selectAccessToken(store.getState());

  if (!token) {
    throw new Error("Cannot find Token");
  }

  try {
    return parseJwt(token);
  } catch (error) {
    console.error("Failed to decode token", error);
    throw error;
  }
}
