const { getSuccessMessage, getErrorMessage } = require("../../../helper/common_helper");
const { questionListService } = require("../service/question_service");

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
module.exports = {
    questionListController
};
