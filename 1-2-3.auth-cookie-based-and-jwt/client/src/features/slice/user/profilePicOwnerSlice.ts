import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getImageOwner } from "@/api/users/GetProfilePicture/getProfilePic";

const initialState = {
  imageUrl: "", // Initial value for imageUrl
};

export const fetchImageOwner = createAsyncThunk(
  "imageOwner/fetchImageOwner",
  async (requestedImageName: any, thunkAPI) => {
    try {
      const response = await getImageOwner(requestedImageName);
      return response.imageUrl || "";
    } catch (error) {
      console.error(`Error getting image owner: ${error}`);
      throw error;
    }
  },
);

const imageOwnerSlice = createSlice({
  name: "imageOwner",
  initialState,
  reducers: {
    // Other reducers if needed
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImageOwner.fulfilled, (state, action) => {
      state.imageUrl = action.payload;
    });
  },
});

export default imageOwnerSlice.reducer;
