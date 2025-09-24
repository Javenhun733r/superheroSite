class AppError extends Error {
    constructor(message, statusCode = 500, originalError = null) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.originalError = originalError;

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

class ValidationError extends AppError {
    constructor(message, originalError = null) {
        super(message, 400, originalError);
        this.name = 'ValidationError';
    }
}
module.exports = { AppError, NotFoundError, BadRequestError, ValidationError };
