
function errorHandler(err, req, res, next) {
    console.error(`${err.name || 'Error'}:`, err);

    const statusCode = err.statusCode || 500;
    const type = err.name || 'Error';
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        error: message,
        type
    });
}
module.exports = errorHandler;
