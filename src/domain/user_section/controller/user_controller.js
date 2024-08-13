const { getSuccessMessage, getErrorMessage } = require("../../../helper/common_helper");
const {userLoginService, userProfileService, updateOrCreateUserService, catergorListService}=require("../service/user_service")



const userLoginController = async (req, res) => {
    try {
        const loginData = await userLoginService(req, res);
        if (loginData.token) {
            getSuccessMessage(res, 200, loginData);
        } else {
            getErrorMessage(res,"error", 400,loginData);
        }
    } catch (error) {
    console.log(error);
        getErrorMessage(res,error, 400);
    }
};


const userProfileController = async (req, res) => {
  try {
    const userData = await userProfileService(req, res);
    if (userData) {
        getSuccessMessage(res, 200, userData);
    }else{
        getErrorMessage(res,"error", 400,userData);
    }
  } catch (error) {
      getErrorMessage(res,error, 400);
  }

};

const updateOrCreateUserController = async (req, res) => {
  try {
    const userData = await updateOrCreateUserService(req, res);
    if (userData.name) {
        getSuccessMessage(res, 200, userData);
    } else {
        getErrorMessage(res,"error", 400,userData);
    }
  } catch (error) {
      getErrorMessage(res,error, 400);
  }
};


module.exports = {
    userLoginController,
    userProfileController,
    updateOrCreateUserController,
};
  