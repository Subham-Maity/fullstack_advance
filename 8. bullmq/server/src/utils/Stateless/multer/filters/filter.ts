import * as path from "path";

export const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  const ext = path.extname(file.originalname).toLowerCase();
  const isValid =
    allowedTypes.includes(file.mimetype) &&
    (ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".gif");

  if (isValid) {
    cb(null, true); // Allow the file
  } else {
    cb(new Error("Only images are allowed")); // Reject the file
  }
};
