const mongoose =require("mongoose");


const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    option:{
        type:String,
        required:true
    },
    rightOption:{
        type:Number,
        required:true
    },
    categories: [
        { 
            type: Schema.Types.ObjectId,
             ref: 'categories' 
        }
    ]
},{
    timestamps:true
}
)
const Questions =mongoose.model("qusetions",questionSchema);
module.exports=Questions