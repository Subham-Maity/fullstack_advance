import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 5050, // You can remove the default value
  host: process.env.HOST || "localhost", // You can remove the default value
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000", // You can remove the default value
  db: process.env.MONGO_URL,

  //🔑 Secret keys - Use in jwtAccess(Stateless)
  JWT_ACCESS_TOKEN: "access_secret" || process.env.JWT_SECRET,
  //🔑 Secret keys - Use in jwtRefresh(Stateless)
  JWT_REFRESH_TOKEN: "refresh_secret" || process.env.JWT_SECRET,
  //📩 Nodemailer - Use in mailer(Stateless)
  EMAIL: process.env.EMAIL || "laisha.dietrich@ethereal.email",
  PASSWORD: process.env.PASSWORD || "mjH2Zf7PEpWrdVnuD6",
};

//⌛ Expiration times - Use in jwtAccess(Stateless) and jwtRefresh(Stateless)
export const ACCESS_TOKEN_EXPIRATION: string = "1h";
export const REFRESH_TOKEN_EXPIRATION: string = "24h";

//🔑 Secret keys - Use in isAuthenticated(Stateful)
export const session_Token = process.env.SESSION_TOKEN || "SUBHAM-AUTH"; // You can remove the default value

//🔑 Secret keys - Use in saveToken(Stateless)
export const REFRESH_TOKEN_EXPIRATION_HASH_SECRET: string = "SUBHAM-AUTH"; // You can remove the default value
//⚙️ Custom salt rounds - Use in custom Crypto(Stateful) and custom Crypto(Stateless)
export const CUSTOM_SALT_ROUNDS: number = 10; // You can remove the default value

//🔐 Token Encryption - Use in custom Crypto(Stateful) and custom Crypto(Stateless)
export const SECRET: string = process.env.SECRET_KEY || "secret"; // You can remove the default value

//✅ Port and CORS URL - Use in server.ts
export const port: string | number = process.env.PORT || 5050; // You can remove the default value
export const corsUrl: string = process.env.CORS_URL || "http://localhost:3000"; // You can remove the default value
