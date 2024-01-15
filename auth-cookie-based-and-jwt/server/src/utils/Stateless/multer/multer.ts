import multer from "multer";
import * as crypto from "crypto";
import { fileFilter } from "./filters/filter";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, fileFilter: fileFilter });

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export { upload, generateFileName };
