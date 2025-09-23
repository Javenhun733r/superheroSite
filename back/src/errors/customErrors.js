class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
    }
}

class BadRequestError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}

module.exports = { AppError, NotFoundError, BadRequestError };
