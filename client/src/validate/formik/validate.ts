import toast from "react-hot-toast";
import { Errors, Values } from "@/types/validation/validation";
import { FORM_VALIDATION } from "@/validate/yup/yup";

/** validate login page username */
//This function is used to validate the username field if it is empty or not and if it contains any space or not.
export async function usernameValidate(values: Values) {
  let errors: Errors = {};

  await FORM_VALIDATION.validate(values, { abortEarly: false }).catch(
    function (err) {
      err.inner.forEach((error: any) => {
        errors[error.path] = toast.error(error.message);
      });
    },
  );

  return errors;
}
