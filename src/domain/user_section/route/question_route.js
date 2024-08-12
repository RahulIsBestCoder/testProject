const express =require("express");
const router=express.Router()
const {AuthValidation,AuthPayloadCheck }=require("../../../helper/jwt_helper");
const { getErrorMessage ,getSuccessMessage, multerHelper } = require("../../../helper/common_helper");
const { validLoginRequest, checkforerrors, validUpdateRequest } = require("../middleware/user_middleware");
const { categoryListController } = require("../controller/category_controller");
const { questionListController } = require("../controller/question_controller");
const methodNotAllowed = (req, res, next) =>{ return getErrorMessage(res,"error",400,"Method not allowed")}

let middleWare=[]

middleWare=[
    // validLoginRequest(),
    // checkforerrors
]
router
.route("/list")
.get(middleWare,questionListController)
.all(methodNotAllowed)

module.exports=router