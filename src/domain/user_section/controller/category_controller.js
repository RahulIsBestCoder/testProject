const { getSuccessMessage, getErrorMessage } = require("../../../helper/common_helper");
const { catergorListService } = require("../service/category_service");

const categoryListController = async (req, res) => {
    try {
        const categoryList = await catergorListService(req, res);
        if(categoryList.length>0){
            getSuccessMessage(res,200,categoryList)
        }else{
            getSuccessMessage(res,204,categoryList)
        }
    } catch (error) {
        getErrorMessage(res,error,400);
    }
};
module.exports = {
    categoryListController
};
