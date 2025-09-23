const { validate: isUuid } = require('uuid');

function checkUuid(req, res, next) {
    const { id } = req.params;
    if (!isUuid(id)) {
        return res.status(500).json({ error: 'Invalid UUID' });
    }
    next();
}

module.exports = checkUuid;
