const helperConfig = require("../configaration/helper_config")
const fs = require("fs")

exports.getErrorMessage = (res, errorData, statusCode, errorResponse) => {
    const responseMessage = {
        [helperConfig.HTTP_RESPONSE_BAD_REQUEST]: "Bad Request",
        [helperConfig.HTTP_RESPONSE_UNAUTHORIZED]: "Unauthorized",
        [helperConfig.HTTP_RESPONSE_FORBIDDEN]: "Forbidden",
        [helperConfig.HTTP_RESPONSE_NOT_FOUND]: "Not Found",
        [helperConfig.HTTP_RESPONSE_METHOD_NOT_ALLOWED]: "Method Not Allowed",
        [helperConfig.HTTP_RESPONSE_NOT_ACCEPTABLE]: "Not Acceptable",
    };

    const defaultMessage = responseMessage[statusCode] || "Unknown Error";
    const response = {
        statusCode: statusCode,
        message: defaultMessage,
        // Optional error response
        ...(errorResponse && { error: errorResponse })
    };

    if (process.env.ERRORCONSOLE == "true") {
        const error = new Error();
        console.log("Stack Trace:", error.stack);
        console.log("Error Response:", errorData);
    }

    res.status(statusCode).send(response);
};

exports.getSuccessMessage = (res, statusCode, data) => {
    const responseMessage = {
        [helperConfig.HTTP_RESPONSE_OK_NO_CONTENT]: "Success with no content",
        [helperConfig.HTTP_RESPONSE_OK]: "Successful",
    };

    const defaultMessage = responseMessage[statusCode] || "Unknown";
    const response = {
        statusCode: statusCode,
        message: defaultMessage,
        ...(data && { data: data })
    };

    res.status(200).send(response);
}

exports.multerHelper = () => {
    const multer = require('multer');
    const path = require('path');

    // Set up storage configuration
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/profileimages/');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });

    // File filter to allow only images
    const fileFilter = (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    };

    return multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: { fileSize: 1024 * 1024 * 2 }
    });

}

exports.multerHelperCsv = () => {
    const multer = require('multer');
    const path = require('path');

    // Set up storage configuration
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/csv/');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });

    // File filter to allow only images
    const fileFilter = (req, file, cb) => {
        const allowedTypes = /csv/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: csv Only!');
        }
    };

    return multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: { fileSize: 1024 * 1024 * 200 }
    });

}

exports.removeFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(new Error(`Failed to remove file: ${err.message}`));
            } else {
                resolve();
            }
        });
    });
};
exports.createTextFile = (filePath, data) => {
    const date = new Date()
    const studentData = [...data];
    const separator = ' | ';
    const headers = Object.keys(studentData[0]);
    const columns = [];
    columns.push(headers.join(separator));

    for (const student of studentData) {
        const row = [];
        for (const key of headers) {
            row.push(`${student[key]}`.padEnd(key.toString().length));
        }
        columns.push(row.join(separator));
    }

    const fileContent = columns.join('\n');
    fs.writeFileSync(filePath.replace("fileName", date.toISOString().replace(/\s+/g, '-')), fileContent);
    return filePath.replace("fileName", date.toISOString().replace(/\s+/g, '-'))
}