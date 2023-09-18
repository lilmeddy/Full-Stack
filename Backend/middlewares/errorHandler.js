const errorHandler = async(err, req,res,next)=>{
    console.log(err);
    if(err.name === "MongoError"){
        if (err.code === 11000){
            return res.status(400).send({message:"Detail already in use", status:false})
        }
    }else if(err.name === "AuthenticationError"){
        return res.status(401).send({message:err.message, status:false})
    }else if(err.name  === "MailerError"){
        return res.status(500).send({message:"Error sending mail, try again", status: false})
    }
    else{
        return res.status(500).send({message:"Internal server error", status:false})
    }
}

export {errorHandler}