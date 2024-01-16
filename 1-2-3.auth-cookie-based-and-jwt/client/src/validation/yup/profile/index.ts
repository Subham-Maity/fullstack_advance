import * as Yup from "yup";

// Email, Username, Password Validation

export const FORM_VALIDATION_PROFILE = Yup.object().shape({
  firstName: Yup.string().required("🙏 First Name Required...!"),

  lastName: Yup.string().required("🙏 Last Name Required...!"),

  email: Yup.string()
    .required("🙏 Email Required...!")
    .email("🤔 Invalid Email...!"),

  mobile: Yup.string()
    .required("🙏 Mobile Number Required...!")
    .matches(/^[0-9]+$/, "🤔 Mobile Number can only contain numbers.")
    .length(10, "🤔 Mobile Number must be exactly 10 digits."),

  address: Yup.string().required("🙏 Address Required...!"),
});
