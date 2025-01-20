const sendResponse = (res, status ,statusCode, message = '', data) => {
    try {
        let response = {
            status: status,
            statusCode: statusCode,
            message: message,
            data: data
        };
        res.status(statusCode).json(response);
    } catch (error) {
        return error;
    }
}

module.exports = { sendResponse };