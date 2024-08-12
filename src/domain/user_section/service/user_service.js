const  jwt  = require("jsonwebtoken");
const { getErrorMessage, removeFile } = require("../../../helper/common_helper");
const bcrypt = require("bcrypt");
const {checkValidId,updateUser,checkValidUser} = require("../model/user_model");

exports.userLoginService = async (req, res) => {   
    try {
        const user = await checkValidUser(req.body.email)
        if (!user) {
            return "User is not registered"
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return "Password / email not matched"
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
        return { id: user.id, token: token };
        
    } catch (error) {
        throw error;
    }
}

exports.userProfileService = async (req, res) => {  
    try {
        const user = await checkValidId(req.params.id)
        if (!user) {
            throw new Error( "User id Invalid")
        }
        return user
    } catch (error) {
        throw error;
    }
}

exports.updateOrCreateUserService = async (req,res)=>{
    try {
        const id=req.params.id
        const oldUserdata=await checkValidId(id)
        req.body.profilePic=req.file?.path ?? oldUserdata.profilePic
        const useData=await updateUser(id,req.body)
        if(oldUserdata.profilePic && req.file && useData){
            removeFile(oldUserdata.profilePic)
        }
        return useData
    } catch (error) {
        throw error;
    }
}
