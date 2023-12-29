import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 5050, // You can remove the default value
  host: process.env.HOST || "localhost", // You can remove the default value
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000", // You can remove the default value
  db: process.env.MONGO_URL,
  JWT_ACCESS_TOKEN: "secret" || process.env.JWT_SECRET, // You can remove the default value or  OpenSSL> OpenSSL> genrsa -out private.pem 2048
  JWT_SECRET_TOKEN: "secret" || process.env.JWT_SECRET, // You can remove the default value or OpenSSL> OpenSSL> rsa - in private.pem -outform PEM -pubout -out public.pem
};

export const port: string | number = process.env.PORT || 5050; // You can remove the default value
export const corsUrl: string = process.env.CORS_URL || "http://localhost:3000"; // You can remove the default value
export const SECRET: string = process.env.SECRET_KEY || "secret"; // You can remove the default value

export const CUSTOM_SALT_ROUNDS: number = 10; // You can remove the default value

export const ACCESS_TOKEN_EXPIRATION: string = "1h";
export const REFRESH_TOKEN_EXPIRATION: string = "24h";
export const session_Token = process.env.SESSION_TOKEN || "SUBHAM-AUTH"; // You can remove the default value
export const REFRESH_TOKEN_EXPIRATION_HASH_SECRET: string = "SUBHAM-AUTH"; // You can remove the default value
