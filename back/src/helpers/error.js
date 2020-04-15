
// https://github.com/nedssoft/express-error-handling/tree/master/helpers
var Logger = require('../loaders/logger');
class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
const handleError = (err, res) => {
    var { statusCode, message } = err;
    if (statusCode == undefined) {
        statusCode = 500
    }
    if (statusCode == 500) {
        Logger.error(message)
        Logger.error(err.stack)
        message = "Oops, something went wrong on our side"
    } else{
        Logger.warn("error "+statusCode+" raised. Message : "+message)
    }
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
};
module.exports = {
    ErrorHandler,
    handleError
};
