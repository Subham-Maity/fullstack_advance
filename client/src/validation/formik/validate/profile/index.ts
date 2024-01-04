import toast from "react-hot-toast";
import { Errors, Values } from "@/types/validation/validation";
import { FORM_VALIDATION_PROFILE } from "@/validation/yup/profile";
/**validate profile page */
// This function is used to validate the email, username, password, and confirmation password fields.

export async function profileValidate(values: Values) {
  let errors: Errors = {};
  await FORM_VALIDATION_PROFILE.validate(values, { abortEarly: false }).catch(
    function (err) {
      err.inner.forEach((error: any) => {
        errors[error.path] = toast.error(error.message);
      });
    },
  );

  return errors;
}
