import * as yup from "yup";

const userValidate = yup.object({
    firstName: yup
    .string("First name must be a string")
    .min(2,"First name is too short")
    .max(20, "First name is too long")
    .required("Firstname is required")
    .matches(/^[a-zA-Z]+$/, "First name must only contain letters"),

    lastName: yup
    .string("First name must be a string")
    .min(2,"First name is too short")
    .max(20, "First name is too long")
    .required("Firstname is required")
    .matches(/^[a-zA-Z]+$/, "First name must only contain letters"),

    email: yup
    .string("Email must be valid")
    .email("Email is required")
    .required("Email is required"),

    password : yup
    .string("First name must be a string")
    .min(8,"Password is too short")
    .max(20, "Password is too long")
    .required("Password is required")
    .matches(/^[a-zA-Z0-9]+$/, "First name must contain letters and numbers"),
   
})
const userLoginValidate = yup.object({

    email: yup
    .string("Email must be valid")
    .email("Email is required")
    .required("Email is required"),

    password : yup
    .string("First name must be a string")
    .min(8,"Password is too short")
    .max(20, "Password is too long")
    .required("Password is required")
    .matches(/^[a-zA-Z0-9]+$/, "First name must contain letters and numbers"),
   
})


export {userValidate,userLoginValidate}