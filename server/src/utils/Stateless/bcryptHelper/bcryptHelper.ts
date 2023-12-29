import * as bcrypt from "bcrypt";

//Function to hash password before saving to a database
export async function bcryptHelper(
  password: string,
  saltOrRounds: number = 10,
): Promise<string> {
  try {
    // Hash the password with the provided salt or rounds and return the hashed password
    return await bcrypt.hash(password, saltOrRounds);
  } catch (error: any) {
    throw new Error(`Unable to hash password: ${error.message}`);
  }
}

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
