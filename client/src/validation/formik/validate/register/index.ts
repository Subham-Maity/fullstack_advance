import toast from "react-hot-toast";
import { Errors, Values } from "@/types/validation/validation";
import { FORM_VALIDATION_REGISTER } from "@/validation/yup/register";
/**validate register page */
// This function is used to validate the email, username, password, and confirmation password fields.
export async function registerValidate(values: Values) {
  let errors: Errors = {};

  await FORM_VALIDATION_REGISTER.validate(values, { abortEarly: false }).catch(
    function (err) {
      err.inner.forEach((error: any) => {
        errors[error.path] = toast.error(error.message);
      });
    },
  );

  return errors;
}
