const mongoose = require("mongoose");


const categoriesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        }
    }, {
    timestamps: true
}
)
const      Categories = mongoose.model("categories", categoriesSchema);


const categoriesList = async () => {
    return new Promise((resolve,reject)=>{
        Categories.aggregate([
            { $match: {} }
        ]).then((response)=>{
            resolve(response)
        }).catch((error)=>{
            reject(error)
        })
    })
}


module.exports = {
    Categories,
    categoriesList
}