class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super()
        this.statusCode = statusCode
        this.message = message
    }
}

const handleError = (err, res) => {
    const { statusCode = 500, message } = err

    const internalMessage = (process.env.NODE_ENV !== 'production') ? message : message

    res.status(statusCode).json({
        statusCode,
        message: internalMessage
    })
}

module.exports = {
    ErrorHandler,
    handleError
}