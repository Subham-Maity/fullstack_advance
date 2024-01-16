import axios from "@/hooks/axios";
import { IUser2Fields } from "@/types/api/user/user.i";
import { sendEmail } from "@/api/mail/mail";
import { DeleteProfilePicOwner } from "@/api/users/DeleteProfilePicture/deleteProfilePic";
import { clearDatabaseApi } from "@/api/users/ClearS3Db/clearS3Db";

/** Register user */
async function register(credentials: IUser2Fields) {
  try {
    const response = await axios.post(`/api/v2/auth/register`, credentials);
    return { msg: response.data.msg, status: response.status };
  } catch (error) {
    console.error(`Error registering user: ${error}`);
    throw error;
  }
}

/** Register user and trigger database clearing if successful */
export async function registerUser(credentials: IUser2Fields) {
  try {
    const { msg, status } = await register(credentials);

    if (status === 201) {
      await sendEmail(
        credentials.username,
        credentials.email,
        msg,
        "Registration Confirmation",
      );

      // Call the API function to trigger database clearing
      await clearDatabaseApi();
    }

    return msg;
  } catch (error) {
    console.error(`Error in registerUser: ${error}`);

    // Call DeleteProfilePicOwner in case of an error
    await DeleteProfilePicOwner(credentials.profile);

    throw error;
  }
}
