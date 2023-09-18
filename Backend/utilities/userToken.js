import  jsonwebtoken  from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
const SECRET =process.env.JWT_SECRET
const generateUserToken = async(email) =>{
    try {
        const token = await jsonwebtoken.sign({email},SECRET,{expiresIn: 20})
        return token
    } catch (error) {
       throw{
        name: "AuthenticationError",
        message: error.message || "Error authenticating user"
       }
    }
}

const verifyUserToken = async (token) => {
    try {
        const decodedToken = jsonwebtoken.verify(token, SECRET)
        console.log(decodedToken);
        const email = decodedToken.email
        return email
    } catch (error) {
        if(error.message === "jwt expired"){
            throw{
                name: "AuthenticationError",
                message:"User authentication failed. Log in again to continue"
            }
        }else{
        throw{
            name: "AuthenticationError",
            message: error.message || "Error generating token"
           }
    }
}

}

export {generateUserToken, verifyUserToken}