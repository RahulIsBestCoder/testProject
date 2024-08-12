const express = require("express");
const app = express();
const userRouter=require("./src/domain/user_section/route/user_route")
const categorRouter=require("./src/domain/user_section/route/category_route")

//section wise url
app.use('/user',userRouter);
app.use('/catergories',categorRouter);

module.exports=app;