const { validate: isUuid } = require('uuid');
const {BadRequestError} = require("../errors/customErrors");

function checkUuid(req, res, next) {
    const { id } = req.params;
    if (!isUuid(id)) {
        throw new BadRequestError("Invalid Uuid");
    }
    next();
}

module.exports = checkUuid;
