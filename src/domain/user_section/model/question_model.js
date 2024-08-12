const mongoose = require("mongoose");
const {Categories}=require("./categories_model")


const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    option:[ {
        option_id:Number,
        answer:String,
    }],
    rightOption: {
        type: Number,
        required: true
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categories'
        }
    ]
}, {
    timestamps: true
}
)
const Questions = mongoose.model("qusetions", questionSchema);

const groupQuestionsByCategory = async () => {
    try {
        const result = await Questions.aggregate([
            {
                $unwind: "$categories"
              },
              {
                $group: {
                  _id: "$categories.category_name",
                  questions: {
                    $push: {
                      question_id: "$_id",
                      question: "$question",
                      options: "$option",
                      rightOption: "$rightOption",
                      createdAt: "$createdAt",
                      updatedAt: "$updatedAt"
                    }
                  }
                }
              },{
                $project: {
                  category_name: "$_id",
                  questions: "$questions",
                  _id: 0
                }
              }
        ]);

        return result;
    } catch (error) {
        throw error;
    }
};



module.exports = {
    Questions,
    groupQuestionsByCategory
}