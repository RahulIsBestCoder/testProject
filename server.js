const mongoose =require("mongoose")
mongoose.connect("mongodb+srv://Rahul:Rahul123@cluster0.1vx1l.mongodb.net/crud")
mongoose.connection.on("connected",connected=>{
    console.log("connected with Database");
})
mongoose.connection.on("error",error=>{
    console.log("failed to connect with database");
});