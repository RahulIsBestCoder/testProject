const express =require("express");
const router=express.Router()
const {AuthValidation,AuthPayloadCheck }=require("../../../helper/jwt_helper");
const userController = require("../controller/user_controller");
const { getErrorMessage ,getSuccessMessage, multerHelper } = require("../../../helper/common_helper");
const { validLoginRequest, checkforerrors, validUpdateRequest } = require("../middleware/user_middleware");
const { categoryListController } = require("../controller/category_controller");
const methodNotAllowed = (req, res, next) =>{ return getErrorMessage(res,"error",400,"Method not allowed")}

let middleWare=[]

middleWare=[
    AuthValidation
]
router
.route("/list")
.get(middleWare,categoryListController)
.all(methodNotAllowed)

module.exports=router