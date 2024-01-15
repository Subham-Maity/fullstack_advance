export interface UserState {
  username: string;
  status: "idle" | "loading" | "succeeded" | "failed";
}
