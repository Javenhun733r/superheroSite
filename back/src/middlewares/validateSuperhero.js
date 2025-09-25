        import Joi from 'joi';
    import { ValidationError } from '../errors/CustomErrors.js';

    const superheroSchema = Joi.object({
        nickname: Joi.string().required(),
        realName: Joi.string().required(),
        originDescription: Joi.string().required(),
        superpowers: Joi.alternatives().try(
            Joi.string(),
            Joi.array().items(Joi.string())
        ).required(),
        catchPhrase: Joi.string().required(),
        imageUrls: Joi.array().items(Joi.string().uri()),
        oldImages: Joi.alternatives().try(
            Joi.array().items(Joi.string().uri()),
            Joi.string()
        )
    });
    ;

    export default (req, res, next) => {
        const { error } = superheroSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const messages = error.details.map(d => d.message);
            return next(new ValidationError(messages.join(', '), error));
        }
        next();
    };
