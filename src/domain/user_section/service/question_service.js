const { groupQuestionsByCategory } = require("../model/question_model")

exports.questionListService=async(req,res)=>{
    try {
     const questionListData= await groupQuestionsByCategory(req,res)
     return questionListData
    } catch (error) {
        throw error
    }
}