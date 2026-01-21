import * as yup from "yup";

/* =========================
   Login
========================= */
export const LoginSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Please enter a valid email."),
  password: yup.string().required("Password is required."),
});

/* =========================
   Reset Password
========================= */
export const ResetSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Please enter a valid email."),
});

/* =========================
   Sign Up
========================= */
export const SignUpSchema = yup
  .object({
    firstName: yup.string().required("First name is required"),

    lastName: yup.string().required("Last name is required"),

    email: yup.string().email("Invalid email").required("Invalid email"),

    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password must be at least 6 characters"),

    passwordConfirmation: yup.string().required("Passwords do not match"),
  })
  .test("passwords-match", "Passwords do not match", function (values) {
    return values.password === values.passwordConfirmation;
  });

/* =========================
   Change Password
========================= */
export const ChangePasswordSchema = yup
  .object({
    newPassword: yup
      .string()
      .min(6, "New password must be at least 6 characters")
      .required("New password must be at least 6 characters"),

    confirmPassword: yup.string().required("Passwords do not match"),
  })
  .test("passwords-match", "Passwords do not match", function (values) {
    return values.newPassword === values.confirmPassword;
  });

/* =========================
   User
========================= */
export const userSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().nullable(),
  email: yup.string().required(),
  emailVerified: yup.boolean().required(),
  createdAt: yup.string().required(),
  banned: yup.boolean().required(),
  role: yup.string().required(),
});
