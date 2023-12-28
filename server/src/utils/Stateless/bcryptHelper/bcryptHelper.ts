import * as bcrypt from "bcrypt";

export async function bcryptHelper(
  password: string,
  saltOrRounds: number = 10,
): Promise<string> {
  try {
    return await bcrypt.hash(password, saltOrRounds);
  } catch (error: any) {
    throw new Error(`Unable to hash password: ${error.message}`);
  }
}
