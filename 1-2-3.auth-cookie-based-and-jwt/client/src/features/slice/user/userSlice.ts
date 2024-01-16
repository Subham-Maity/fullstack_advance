import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "@/types/reduxSlice/user/user.type";

const initialState: UserState = {
  username: "",
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //This is the action for setting the username
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
