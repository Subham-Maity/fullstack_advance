export interface AuthState {
  status: "idle" | "loading" | "succeeded" | "failed";
  accessToken: string;
}
