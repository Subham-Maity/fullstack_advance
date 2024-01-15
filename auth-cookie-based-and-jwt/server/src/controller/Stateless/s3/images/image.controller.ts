import { Request, Response } from "express";

import {
  deleteFile,
  getObjectSignedUrl,
  uploadFile,
} from "../../../../utils/Stateless/fileStorage/S3Bucket/S3Bucket";
import {
  generateFileName,
  upload,
} from "../../../../utils/Stateless/multer/multer";
import { resizeImage } from "../../../../utils/Stateless/mediaProcessing/sharp";
import {
  clearDatabase,
  deleteImageByName,
  deleteLastImageEntry,
  getLastImageEntry,
  savePost,
} from "../../../../model/Stateless/s3/s3Image.model";

//This will be used to upload images to S3Bucket and save the image name to the database
const processImage = async (
  file: Express.Multer.File,

  uploadFile: Function, // assuming uploadFile is imported from your S3Bucket module
) => {
  const imageName = generateFileName();
  //for profile picture you can set anything you want
  const fileBuffer = await resizeImage(file.buffer, {
    height: 1080,
    width: 1080,
    fit: "contain",
  });

  await uploadFile(fileBuffer, imageName, file.mimetype);

  await savePost(imageName);
};

//upload is a multer middleware that will be used to upload the image to the server
const uploadImage = upload.single("image");

//This is the handler that will be used to process the image and save it to the database and S3Bucket
const uploadImageHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const file: any = req.file;
    // Assuming uploadFile is imported from your S3Bucket module
    await processImage(file, uploadFile);

    res.status(200).send("Image uploaded successfully");
  } catch (error) {
    res.status(500).send("Error uploading image");
  }
};

const getLastImageSignedUrlController = async (req: Request, res: Response) => {
  try {
    const lastImage = await getLastImageEntry();
    if (!lastImage) {
      return res.status(404).send("No images found");
    }
    res.json({ imageName: lastImage.imageName });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating signed URL");
  }
};

const getOwnerImageSignedUrlController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { requestedImageName } = req.body;

    if (!requestedImageName) {
      return res.status(400).send("No image name provided");
    }

    const signedUrl = await getObjectSignedUrl(requestedImageName);
    if (signedUrl) {
      return res.json({ imageUrl: signedUrl });
    } else {
      return res
        .status(404)
        .send("Requested image not found or error generating signed URL");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating signed URL");
  }
};

//delete the image controller
const deleteImage = async (req: Request, res: Response) => {
  try {
    const { requestedImageName } = req.body;

    if (!requestedImageName) {
      return res.status(400).send("No image name provided");
    }

    // Delete the specified image
    await deleteFile(requestedImageName);

    // Delete the corresponding entry from the database
    const deletedImage = await deleteImageByName(requestedImageName); // Assuming a function to delete by name exists

    if (!deletedImage) {
      return res.status(404).send("Image entry not found in the database");
    }

    res.status(200).send("Image and its database entry deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting image");
  }
};

//It will be used to clear the database after registering the user (we will call it from the frontend)
const clearDatabaseController = async (req: Request, res: Response) => {
  try {
    await clearDatabase();
    res.status(200).send("Database cleared successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error clearing database");
  }
};

export {
  uploadImage,
  uploadImageHandler,
  getLastImageSignedUrlController,
  getOwnerImageSignedUrlController,
  deleteImage,
  clearDatabaseController,
};
