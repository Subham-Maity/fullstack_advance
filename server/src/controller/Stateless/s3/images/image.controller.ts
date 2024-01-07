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
    const lastImage = await getLastImageEntry();

    if (!lastImage) {
      return res.status(404).send("No images found");
    }

    if (requestedImageName === lastImage.imageName) {
      const signedUrl = await getObjectSignedUrl(requestedImageName);
      return res.json({ imageUrl: signedUrl });
    } else {
      return res
        .status(400)
        .send("Requested image does not match the last image");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating signed URL");
  }
};

//delete the image controller
const deleteImage = async (req: Request, res: Response) => {
  try {
    const lastImage = await getLastImageEntry();
    if (!lastImage) {
      return res.status(404).send("No images found");
    }

    const { imageName } = lastImage; // Assuming you have a field named 'imageName'

    await deleteFile(imageName);

    if (lastImage) {
      await deleteLastImageEntry(); // Delete the image from the database
    }

    res.status(200).send("Image deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting image");
  }
};
export {
  uploadImage,
  uploadImageHandler,
  getLastImageSignedUrlController,
  getOwnerImageSignedUrlController,
  deleteImage,
};
