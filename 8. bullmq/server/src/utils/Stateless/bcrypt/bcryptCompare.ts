import * as bcrypt from "bcrypt";

// Function to compare password with user's hashed password
export const comparePasswords = async (
  password: string,
  hashedPassword: string,
) => {
  try {
    // Compare the provided password with the hashed password in the database and return true or false
    return await bcrypt.compare(password, hashedPassword);
  } catch (error: any) {
    throw new Error(`Error comparing passwords: ${error.message}`);
  }
};
