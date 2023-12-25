import * as Yup from "yup";

export const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string()
    .required("Username Required...! 😣")
    .test("no-space", "Invalid Username...! 😣", (value) => {
      return !(value && value.includes(" "));
    }),
});
