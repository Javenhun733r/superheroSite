import { validate as isUuid } from 'uuid';
import { BadRequestError } from '../errors/CustomErrors.js';

function checkUuid(req, res, next) {
    const { id } = req.params;
    if (!isUuid(id)) {
        throw new BadRequestError("Invalid Uuid");
    }
    next();
}

export default checkUuid;
