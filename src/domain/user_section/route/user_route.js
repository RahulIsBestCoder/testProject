const express =require("express");
const { studentList, studentChange, numberList } = require("../controller/studentController");
const { studentValidData } = require("../middleware/middleware");
const data = require("../middleware/keyList");
const router=express.Router()

router.use("/user",router)
router.get("/create",studentList)
// router.get("/list/studentnumber",numberList)
// router.post("/save",data.valid,studentValidData,studentChange)
module.exports=router