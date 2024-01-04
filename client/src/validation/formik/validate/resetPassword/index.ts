import toast from "react-hot-toast";
import { Errors, Values } from "@/types/validation/validation";
import { FORM_VALIDATION_RESET_PASSWORD } from "@/validation/yup/resetPassword";

/**validate reset password page */

//This function is used to validate the password field and the confirmation password field.
export async function resetPasswordValidate(values: Values) {
  let errors: Errors = {};

  await FORM_VALIDATION_RESET_PASSWORD.validate(values, {
    abortEarly: false,
  }).catch(function (err) {
    err.inner.forEach((error: any) => {
      errors[error.path] = toast.error(error.message);
    });
  });

  return errors;
}
