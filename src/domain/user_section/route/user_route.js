const express =require("express");
const router=express.Router()
const jwtAuthentication=require("../../../helper/jwt_helper");
const userController = require("../controller/user_controller");
const { getErrorMessage } = require("../../../helper/common_helper");
const methodNotAllowed = (req, res, next) => getErrorMessage(400,null)

let middleWare=[]

middleWare=[
    jwtAuthentication.AuthValidation,
    jwtAuthentication.AuthPayloadCheck,
]
router
.route("/login")
// .post(middleWare,userController)
.all(methodNotAllowed)
// router.post("/save",data.valid,studentValidData,studentChange)
module.exports=router