import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
//This one help to fetch the signed url
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  accessKeyId,
  bucketName,
  region,
  secretAccessKey,
} from "../storageConfig";

if (!accessKeyId || !secretAccessKey || !region) {
  throw new Error("AWS credentials or region are not defined");
}

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function uploadFile(
  fileBuffer: Buffer,
  fileName: string,
  mimetype: string,
) {
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype,
  };

  try {
    return await s3Client.send(new PutObjectCommand(uploadParams));
  } catch (error) {
    console.error(`Error uploading file: ${error}`);
    throw error;
  }
}

export async function deleteFile(fileName: string) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  };

  try {
    return await s3Client.send(new DeleteObjectCommand(deleteParams));
  } catch (error) {
    console.error(`Error deleting file: ${error}`);
    throw error;
  }
}

export async function getObjectSignedUrl(key: string) {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    const command = new GetObjectCommand(params);
    const seconds = 5;
    return await getSignedUrl(s3Client, command, { expiresIn: seconds });
  } catch (error) {
    console.error(`Error getting object signed URL: ${error}`);
    throw error;
  }
}
