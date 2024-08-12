const {check, validationResult}=require("express-validator");
const { getErrorMessage, getSuccessMessage } = require("../../../helper/common_helper");
exports.validLoginRequest = () => {
    return [
        check('email')
            .notEmpty().withMessage('Email should not be empty')
            .isString().withMessage('Email must be a string')
            .isEmail().withMessage('Please provide a valid email'),
        
        check('password')
            .notEmpty().withMessage('Password should not be empty')
            .isString().withMessage('Password must be a string'),
    ];
}


exports.checkforerrors = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let response_status = {};
        let response_dataset = {};
        let response_data = {};
        let errorVal = errors.array();

        response_dataset = errorVal;
        response_status.msg = errorVal[0].msg.toLowerCase();
        response_status.msg = response_status.msg.charAt(0).toUpperCase() + response_status.msg.slice(1);

        response_status.action_status = false;
        response_data.data = response_dataset;
        response_data.status = response_status;
        getErrorMessage(res,"error",400, response_data);
    } else {
        next();
    }
};

