const express =require("express");
const router=express.Router()
const {AuthValidation,AuthPayloadCheck }=require("../../../helper/jwt_helper");
const userController = require("../controller/user_controller");
const { getErrorMessage ,getSuccessMessage, multerHelper } = require("../../../helper/common_helper");
const { validLoginRequest, checkforerrors, validUpdateRequest } = require("../middleware/user_middleware");
const methodNotAllowed = (req, res, next) =>{ return getErrorMessage(res,"error",400,"Method not allowed")}

let middleWare=[]

middleWare=[
    validLoginRequest(),
    checkforerrors
]
router
.route("/login")
.post(middleWare,userController.userLoginController)
.all(methodNotAllowed)

middleWare=[ 
AuthValidation,
]
router
.route("/:id")
.get(middleWare,userController.userProfileController)
.all(methodNotAllowed)


middleWare=[
    AuthValidation,
    validUpdateRequest,
    checkforerrors
]
router
.route("/update/:id")
.put(middleWare,multerHelper().single("image"),userController.updateOrCreateUserController)
.all(methodNotAllowed)


module.exports=router