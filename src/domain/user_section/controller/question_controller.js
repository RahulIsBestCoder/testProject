const { getSuccessMessage, getErrorMessage } = require("../../../helper/common_helper");
const { questionListService, questionCreateService } = require("../service/question_service");

const questionListController = async (req, res) => {
    try {
        const questionList = await questionListService(req, res);
        if(questionList.length>0){
            getSuccessMessage(res,200,questionList)
        }else{
            getSuccessMessage(res,204,questionList)
        }
    } catch (error) {
        getErrorMessage(res,error,400);
    }
};

const questionCreateController = async (req, res) => {
    try {
        const questionList = await questionCreateService(req, res);
        if(questionList.length>0){
            getSuccessMessage(res,200,questionList)
        }else{
            getSuccessMessage(res,204,questionList)
        }
    } catch (error) {
        getErrorMessage(res,error,400,error);
    }
};
module.exports = {
    questionListController,
    questionCreateController
};
