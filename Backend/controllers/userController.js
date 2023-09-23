
import { userModel } from "../models/userModel.js"
import bcryptjs from "bcryptjs"
import { generateUserToken, verifyUserToken } from "../utilities/userToken.js";
import { sendMail, forgotPasswordMail } from "../utilities/mailer.js";
import { generateCode } from "../utilities/codeGenerator.js";
import { forgotPasswordModel } from "../models/forgotPasswordModel.js";
import { cloudinary } from "../utilities/cloudinaryConfig.js";

// const signup = async (req,res)=>{
//     try {
//      const {firstName, lastName, email, password}  = req.body
//      const checkUser = await userModel.findOne({email: email})
//      if(checkUser){
//         return res.status(401).send({message:"Email used" , status:false})
//      }
//      const signUp= await userModel.create({firstName,lastName,email,password})
//      console.log(signUp);
//      res.status(210).send({message:"User Created", status:true})  
//     } catch (error) {
//      console.log(error);
//      res.status(500).send({message:"Internal sever error", status:false})  
//     }
// }

const signup = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const checkUser = await userModel.findOne({ email: email });
        if (checkUser) {
            return res.status(401).send({ message: "Email used", status: false });
        }

        const signUp = await userModel.create({
            firstName,
            lastName,
            email,
            password,
        });
        console.log(signUp);
        await sendMail(email,firstName)
        res.status(210).send({ message: "User Created", status: true });
    } catch (error) {
        next(error)
        // console.log(error);
        // res.status(500).send({ message: "Internal sever error", status: false });
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const checkUser = await userModel.findOne({ email:email });
        if (!checkUser) {
            return res
                .status(401)
                .send({ message: "User not found. Please register", status: false });
        }
        const verifyPass = await bcryptjs.compare(password, checkUser.password)
        if (!verifyPass){
            return res.status(401).send({ message: "Incorrect Password", status: false }); 
        }
        const token = await generateUserToken(email)
        console.log(token,33);
        return res
            .status(200)
            .send({
                message: `Login Successfully, User ${checkUser.firstName}`,
                status: true,
                token
            });
    } catch (error) {
        next(error)
        // res.status(500).send({ message: "Internal sever error", status: false });
    }
};

const viewUsers = async (req,res,next)=> {
    try {
        const token = req.headers.authorization;
        const email = await verifyUserToken(token)
        const verifyUser = await userModel.findOne({email:email})
        if (!verifyUser){
            return res.status(401).send({ message: "Invalid", status: false }); 
        }
        const viewUsers = await userModel.find({});
        return res
        .status(200)
        .send({
            message: "All the, User",
            status: true,
            viewUsers
        });
    } catch (error) {
        next(error)
    }
}

const forgotPassword = async (req,res,next) =>{
    try {
        const {email} = req.body
       const OTP = generateCode() 

       const user = await userModel.findOne({email:email})
       if (!user){
        return res.status(404).send({message:"User not found", status:false})
       }
    

       const forgotPassword = await forgotPasswordModel.create({email:email, OTP:OTP})
       if(!forgotPassword){
        return res.status(500).send({message: "Error generating OTP. Please try again", status:false})
       }
       const firstName = user.firstName
       await forgotPasswordMail(email,firstName,OTP)
       res.status(200).send({message: "Check your mail for OTP", status:true})
    } catch (error) {
        next(error)
    }
}

const resetPassword = async (req,res,next) =>{
    try {
        const {OTP, email, password} = req.body
        const findOTP = await forgotPasswordModel.findOne({email:email, OTP:OTP})
        if(!findOTP){
            return res.status(404).send({message: "OTP not found. Try again"})
        }
        
        let hashedPassword = await bcryptjs.hash(password, 10)
        // this.password = hashedPassword
        const update = await userModel.updateOne({email:email},{$set:{password:hashedPassword}})
        if(!update.acknowledged){
            return res.status(500).send({message: "Error generating OTP. Please try again", status:false})
        }
        res.status(200).send({message: "Password updated", status:true})
    } catch (error) {
        next(error)
    }
}

const uploadImage = async (req,res,next) =>{
    try {
    const {data} = req.body
    const result = await cloudinary.uploader.upload(data)
    console.log(result);
    const {secure_url, public_id} = result;
    res.status(201).send({message:"Image uploade", status:true, secure_url,public_id})

    } catch (error) {
        next(error)
    }
}

export { signup, login , viewUsers, forgotPassword, resetPassword, uploadImage};




