const jwt = require("jsonwebtoken")
const { getErrorMessage } = require("./common_helper")
const AuthValidation=(req,res)=>{
    const AuthToken=req.header(Authorization).replace("bearer","").trim()
    jwt.verify(AuthToken,process.env.JWT_SECRET,((err,value)=>{
        if(err){
            getErrorMessage(res,"error",401)
        }
    }))
}
const AuthPayloadCheck=(req,res)=>{
    const AuthToken=req.header(Authorization).replace("bearer","").trim()
    const payLoad=jwt.decode(AuthToken)
}
module.exports={
    AuthValidation,
    AuthPayloadCheck
}