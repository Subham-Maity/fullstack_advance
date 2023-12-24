import crypto from "crypto";
import {SECRET} from "../../../config/default";

/**
 * Generate a random string of 128 characters (salt)
 * @returns {string} A random string used as salt
 */
export const random = (): string => {
  // Using 64 bytes (or 512 bits) is sufficient for generating a strong salt
  // Use hex for efficient storage and retrieval
  return crypto.randomBytes(128).toString("hex");
};

/**
 * Hashes the password using PBKDF2 with a given salt and secret key
 * @param {string} password - The password to hash
 * @param {string} salt - The salt used in hashing
 * @returns {Promise<string>} A promise that resolves with the hashed password
 */
export const authentication = (
  password: string,
  salt: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password, // The plaintext password to be hashed
      salt, // The unique salt to prevent precomputed attacks
      1000000, // High iteration count to slow down cracking attempts
      128, // Desired length of the derived key in bytes
      "sha512", // Secure hashing algorithm (SHA-512)
      (err, derivedKey) => {
        if (err) {
          reject(err);
        } else {
          const hmac = crypto.createHmac("sha512", SECRET); // Create HMAC using secret key
          hmac.update(derivedKey); // Update HMAC with derived key
          // Return the final hashed password using the secret key
          resolve(hmac.digest("hex"));
        }
      },
    );
  });
};
