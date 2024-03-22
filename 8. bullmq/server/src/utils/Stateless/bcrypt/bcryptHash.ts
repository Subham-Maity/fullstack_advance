import * as bcrypt from "bcrypt";

//Function to hash password before saving to a database
export async function bcryptHash(
  password: string,
  saltOrRounds: number = 10,
): Promise<string> {
  try {
    // Hash the password with the provided salt or rounds and return the hashed password
    const salt = await bcrypt.genSalt(saltOrRounds);
    return await bcrypt.hash(password, salt);
  } catch (error: any) {
    throw new Error(`Unable to hash password: ${error.message}`);
  }
}
