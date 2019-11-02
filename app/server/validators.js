const Joi = require('@hapi/joi');

const getRequestSchema = Joi.number();
const setRequestSchema = Joi.object({
    advertid: Joi.number()
        .required(),
    type: Joi.valid(
        0,
        1,
        2,
        3
    )
        .required(),
    message: Joi.string()
        .required()
});

module.exports = {
    getRequestSchema: getRequestSchema,
    setRequestSchema: setRequestSchema,
};