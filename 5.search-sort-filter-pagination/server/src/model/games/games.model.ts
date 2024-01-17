import mongoose, { model, Schema } from "mongoose";
import { IVideoGame } from "../../types/games/games.type";

// Create the VideoGame schema
const VideoGameSchema: Schema<IVideoGame> = new Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

// Create the VideoGame model
const VideoGameModel = model<IVideoGame>("VideoGame", VideoGameSchema);
export default VideoGameModel || mongoose.models.VideoGame;
