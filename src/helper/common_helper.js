const helperConfig =require("../configaration/helper_config")

const getErrorMessage = (statusCode, errorResponse = null) => {
    const errorMessages = {
        [helperConfig.HTTP_RESPONSE_BAD_REQUEST]: "Bad Request",
        [helperConfig.HTTP_RESPONSE_UNAUTHORIZED]: "Unauthorized",
        [helperConfig.HTTP_RESPONSE_FORBIDDEN]: "Forbidden",
        [helperConfig.HTTP_RESPONSE_NOT_FOUND]: "Not Found",
        [helperConfig.HTTP_RESPONSE_METHOD_NOT_ALLOWED]: "Method Not Allowed",
        [helperConfig.HTTP_RESPONSE_NOT_ACCEPTABLE]: "Not Acceptable",
    };

    const defaultMessage = errorMessages[statusCode] || "Unknown Error";
    const response = {
        statusCode: statusCode,
        message: defaultMessage,
        ...(errorResponse && { error: errorResponse }) // Optional error response
    };

    return response;
};
module.exports=getErrorMessage