// Email, Username, Password Validation
import * as Yup from "yup";

export const FORM_VALIDATION_REGISTER = Yup.object().shape({
  email: Yup.string()
    .required("Email Required...! 😣")
    .email("Invalid Email...! 😣"),

  username: Yup.string()
    .required("Username Required...! 😣")
    .test("no-space", "Invalid Username...! 😣", (value) => {
      return !(value && value.includes(" "));
    }),

  password: Yup.string()
    .required("😥 Password Required...!")
    .min(4, "😶 Password must be more than 4 characters long.")
    .matches(
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
      "😫 Password must have a special character.",
    )
    .min(8, "😬 Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "😖 Password can only contain Latin letters.")
    .matches(/[A-Z]/, "😵 Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "😵‍💫 Password must contain at least one lowercase letter.")
    .matches(/[0-9]+/, "🐸 Password must contain at least one number.")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "😱 Password must contain at least one special character.",
    ),
});
