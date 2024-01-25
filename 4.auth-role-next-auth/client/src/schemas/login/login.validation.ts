import z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email("Invalid Email...! 😣")
    .min(1, "Email Required...! 😣"),

  password: z
    .string()
    .min(8, "😬 Password is too short - should be 8 chars minimum.")
    .max(100, "😱 Password is too long - should be 100 chars maximum.")
    .regex(
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
      "😫 Password must have a special character.",
    )
    .regex(/[a-zA-Z]/, "😖 Password can only contain Latin letters.")
    .regex(/[A-Z]/, "😵 Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "😵‍💫 Password must contain at least one lowercase letter.")
    .regex(/[0-9]+/, "🔢 Password must contain at least one number.")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "😱 Password must contain at least one special character.",
    )
    .min(1, "😥 Password Required...!"),

  code: z.string().optional(),
});
