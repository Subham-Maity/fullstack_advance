import * as Yup from "yup";
//Reset Password Validation
export const FORM_VALIDATION_RESET_PASSWORD = Yup.object().shape({
  password: Yup.string()
    .required("😥 New Password Required...!")
    .test("no-space", "😕 Wrong Password...! No spaces allowed.", (value) => {
      return !(value && value.includes(" "));
    })
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
  confirm_pwd: Yup.string()
    .required("😥 Confirmation Password Required...!")
    .oneOf([Yup.ref("password")], "😰 Passwords must match"),
});
