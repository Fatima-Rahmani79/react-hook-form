import * as yup from "yup";

const registerSchema = yup
  .object({
    fullName: yup
      .string()
      .required("Full Name is required")
      .min(3, "Full Name must be at least 3 characters"),

    email: yup
      .string()
      .required("Email is required")
      .email("Must be a valid email"),

    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/\d/, "Password must contain at least one number"),

    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),

    terms: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions"),
  })
  .required();

export default registerSchema;
