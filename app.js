const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config(); 

const port = process.env.PORT || 3000; 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({ origin: true, credentials: true }));

const mongoose =require("mongoose")
mongoose.connect("mongodb+srv://Rahul:Rahul123@cluster0.1vx1l.mongodb.net/crud")
mongoose.connection.on("connected",connected=>{
    console.log("connected with Database");
})
mongoose.connection.on("error",error=>{
    console.log("failed to connect with database");
});
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
