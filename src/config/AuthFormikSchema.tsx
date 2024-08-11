import * as Yup from "yup";

export const authStoreSchema = Yup.object({
  fullName: Yup.string()
    .required("Fullname is required.")
    .matches(/^\S+\s\S+$/, "Invalid fullname"),

  dateOfBirth: Yup.date()
    .required("Date of birth is required.")
    .max(new Date(), "Date of birth cannot be in the future"),

  gender: Yup.string()
    .oneOf(["Male", "Female", "Other"], "Invalid gender")
    .required("Gender is required"),

  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required."),

  address: Yup.string()
    .min(5, "Address must be at least 5 characters")
    .required("Address is required."),

  username: Yup.string()
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username cannot be longer than 20 characters")
    .required("Username is required."),

  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),

  email: Yup.string()
    .required("Email is required.")
    .email("Invalid email address"),

  confirmPassword: Yup.string()
    .required("Please confirm your password.")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

// const authUpdateSchema = Yup.object({
//   fullName: Yup.string()
//     .required("Fullname is required.")
//     .matches(/^\S+\s\S+$/, "Invalid fullname"),

//   dateOfBirth: Yup.date()
//     .required("Date of birth is required.")
//     .max(new Date(), "Date of birth cannot be in the future"),

//   gender: Yup.string()
//     .oneOf(["Male", "Female", "Other"], "Invalid gender")
//     .required("Gender is required"),

//   phoneNumber: Yup.string()
//     .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
//     .required("Phone number is required."),

//   address: Yup.string()
//     .min(5, "Address must be at least 5 characters")
//     .required("Address is required."),

//   username: Yup.string()
//     .min(4, "Username must be at least 4 characters")
//     .max(20, "Username cannot be longer than 20 characters")
//     .required("Username is required."),

//   password: Yup.string()
//     .required("Password is required.")
//     .min(8, "Password must be at least 8 characters")
//     .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .matches(/[a-z]/, "Password must contain at least one lowercase letter")
//     .matches(/[0-9]/, "Password must contain at least one number")
//     .matches(
//       /[!@#$%^&*(),.?":{}|<>]/,
//       "Password must contain at least one special character"
//     ),

//   email: Yup.string()
//     .required("Email is required.")
//     .email("Invalid email address"),
// });
