import toast from "react-hot-toast";
import { Errors, Values } from "@/types/validation/validation";
import { FORM_VALIDATION_USERNAME } from "@/validation/yup/username";
import { authenticate } from "@/api/authenticate/authenticate";

/** validate login page username */
//This function is used to validate the username field if it is empty or not and if it contains any space or not.
export async function usernameValidate(values: Values) {
  let errors: Errors = {};

  await FORM_VALIDATION_USERNAME.validate(values, { abortEarly: false }).catch(
    function (err) {
      err.inner.forEach((error: any) => {
        errors[error.path] = toast.error(error.message);
      });
    },
  );
  // check user exist or not
  if (values.username && !errors.username) {
    const { status } = await authenticate(values.username);
    if (status !== 200) {
      errors.exist = toast.error("User does not exist...!");
    }
  }

  return errors;
}
