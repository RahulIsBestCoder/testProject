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
const Categories = mongoose.model("categories", categoriesSchema);
module.exports = Categories