const express = require("express")
const app=express()
const cors=require("cors")
const bodyParser=require("body-parser")
const dotenv =require("dotenv")
const studentRoute=require("./src/domain/user_section/route/user_route")
var port= 3000
dotenv.config()
app.listen(port,console.log(`Listening at http://localhost:${port}`));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors({origin:true,credential:true}))
app.use(process.env.BASEURL,studentRoute)