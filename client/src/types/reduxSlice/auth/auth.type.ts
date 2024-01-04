export interface AuthState {
  username: string;
  status: "idle" | "loading" | "succeeded" | "failed";
}
