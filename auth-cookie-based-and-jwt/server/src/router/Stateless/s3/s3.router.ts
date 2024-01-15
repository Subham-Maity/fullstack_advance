import * as express from "express";
import { Router } from "express";
import {
  clearDatabaseController,
  deleteImage,
  getLastImageSignedUrlController,
  getOwnerImageSignedUrlController,
  uploadImage,
  uploadImageHandler,
} from "../../../controller/Stateless/s3/images/image.controller";

const s3: Router = express.Router();

s3.post("/images", uploadImage, uploadImageHandler) //multer + s3
  .get("/images", getLastImageSignedUrlController) //s3
  .post("/get-owner-image", getOwnerImageSignedUrlController)
  .post("/remove-owner-image", deleteImage)
  .post("/clear-database-s3", clearDatabaseController); //clear database

export default s3;
