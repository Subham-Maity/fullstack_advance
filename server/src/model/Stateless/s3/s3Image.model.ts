import { model, Schema } from "mongoose";
import { S3PostImagesI } from "../../../types/Stateless/s3/s3.i";

const S3PostImagesSchema: Schema = new Schema({
  imageName: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// ****************************************
// 🏭 Creating the UserToken Model
// ****************************************
export const S3PostImages = model<S3PostImagesI>(
  "S3PostImages",
  S3PostImagesSchema,
);

// ****************************************

export const savePost = async (imageName: string) => {
  try {
    const newPost = new S3PostImages({ imageName });
    return await newPost.save();
  } catch (err) {
    console.log(err);
  }
};

// 🔍 Get all images from the database in descending order of creation
export const getImagesFromDb = async () => {
  try {
    return await S3PostImages.find().sort({ created: -1 });
  } catch (err) {
    console.log(err);
  }
};

// 🔍 Get image name by id
export const getImageNameById = async (id: string) => {
  try {
    return await S3PostImages.findById(id);
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching image name from DB");
  }
};

// 🔍 Get last image entry
export const getLastImageEntry = async () => {
  try {
    return await S3PostImages.findOne().sort({ created: -1 });
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching last image entry from DB");
  }
};

//delete last image entry by id
export const deleteLastImageEntry = async () => {
  try {
    return await S3PostImages.findOneAndDelete().sort({ created: -1 });
  } catch (err) {
    console.log(err);
    throw new Error("Error deleting last image entry from DB");
  }
};

//delete image by name

export const deleteImageByName = async (imageName: string) => {
  try {
    return await S3PostImages.findOneAndDelete({ imageName });
  } catch (err) {
    console.log(err);
    throw new Error("Error deleting image by name from DB");
  }
};

//Clear the database
export const clearDatabase = async () => {
  try {
    return await S3PostImages.deleteMany({});
  } catch (err) {
    console.log(err);
    throw new Error("Error clearing database");
  }
};
