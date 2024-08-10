const jwt = require("jsonwebtoken")
const AuthValidation=(req,res)=>{
    const AuthToken=req.header(Authorization).replace("bearer","").trim()
    jwt.verify(AuthToken,process.env.JWT_SECRET,((err,value)=>{
        if(err){
            res.status(401).send("Unauthorized")
        }
    }))
}
module.exports=AuthValidation
const AuthPayloadCheck=(req,res)=>{
    const AuthToken=req.header(Authorization).replace("bearer","").trim()
    const payLoad=jwt.decode(AuthToken)
}
module.exports=AuthPayloadCheck