import * as Yup from "yup";

//Username Validation
export const FORM_VALIDATION_USERNAME = Yup.object().shape({
  username: Yup.string()
    .required("Username Required...! 😣")
    .test("no-space", "Invalid Username...! 😣", (value) => {
      return !(value && value.includes(" "));
    }),
});
