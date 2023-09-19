import { login, signup, viewUsers , forgotPassword, resetPassword, uploadImage} from "../controllers/userController.js";
import express from "express"
import { validate } from "../middlewares/validator.js";
import { userValidate } from "../middlewares/userValidate.js";
import { userLoginValidate } from "../middlewares/userValidate.js";

const userRoutes = express.Router()
userRoutes.post("/signup",validate(userValidate), signup);
userRoutes.post("/login",validate(userLoginValidate), login);
userRoutes.get("/viewUsers", viewUsers);
userRoutes.post("/forgotpassword", forgotPassword)
userRoutes.post("/resetpassword", resetPassword)
userRoutes.post("/upload", uploadImage)

userRoutes.post("/login", login);

export { userRoutes };
