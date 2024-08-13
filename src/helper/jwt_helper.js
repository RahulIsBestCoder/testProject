const jwt = require("jsonwebtoken")
const { getErrorMessage } = require("./common_helper")
const AuthValidation = (req, res, next) => {
    const AuthToken = req.header("Authorization")?.replace("Bearer", "").trim() || "";

    jwt.verify(AuthToken, process.env.JWT_SECRET, (err, value) => {
        if (err) {
             getErrorMessage(res, err, 401); 
             return err
        }
        req.user = value;
        next();
    });
};

const AuthPayloadCheck=(req,res)=>{
    const AuthToken=req.header("Authorization").replace("Bearer","").trim()
    const payLoad=jwt.decode(AuthToken)
}
module.exports={
    AuthValidation,
    AuthPayloadCheck
}