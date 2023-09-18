const validate =(schema) => async(req,res,next) =>{
    const body = req.body
    try{
await schema.validate(body)
next()
    }catch (error){
        console.log(error);
return res.status(409).send({message:error.message})
    }
}

export{validate}