import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT || 5050,
    host: process.env.HOST || "localhost",
    corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
    db: process.env.MONGO_URL,
};

export const port: string | number = process.env.PORT || 5050;
export const corsUrl = process.env.CORS_URL || "http://localhost:3000";
