import mongoose from "mongoose";

const forgotPasswordSchema = new mongoose.Schema({
    OTP : {type:String, required:true},
    email : {type:String, required:true}
})

const forgotPasswordModel = mongoose.model("forgotPassword_tbs", forgotPasswordSchema) || mongoose.models.forgotPassword_tbs;

export{forgotPasswordModel}