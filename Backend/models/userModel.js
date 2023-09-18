import mongoose from "mongoose";
import bcryptjs from "bcryptjs"

const userSchema = new mongoose.Schema({
    firstName :{type:String, required:true,trim:true},
    lastName :{type:String, required:true,trim:true},
    email :{type:String, required:true, trim:true, unique:true},
    password:{type:String, required:true,trim:true},
})

userSchema.pre("save", async function(next){

    try {
        if(this.password !== undefined){
        let hashedPassword = await bcryptjs.hash(this.password, 10)
        this.password = hashedPassword
        next()
    }
    } catch (error) {
        console.log("Error hashing password: "+ error);
    }
 


})

const userModel = mongoose.models.user_tbs || mongoose.model("user_tbs", userSchema)

export{userModel}