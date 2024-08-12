const express = require("express");
const app = express();
const userRouter=require("./src/domain/user_section/route/user_route")
const categorRouter=require("./src/domain/user_section/route/category_route")
const questionRouter=require("./src/domain/user_section/route/question_route")

//section wise url
app.use('/user',userRouter);
app.use('/catergories',categorRouter);
app.use('/question',questionRouter);

module.exports=app;