const Joi = require('joi');

const superheroSchema = Joi.object({
    nickname: Joi.string().required(),
    realName: Joi.string().required(),
    originDescription: Joi.string().required(),
    superpowers: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string())
    ).required(),
    catchPhrase: Joi.string().required(),
    imageUrls: Joi.array().items(Joi.string().uri())
});

module.exports = (req, res, next) => {
    const { error } = superheroSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
