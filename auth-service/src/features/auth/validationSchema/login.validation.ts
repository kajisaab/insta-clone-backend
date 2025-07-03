import Joi from 'joi';

export const loginValidation = Joi.object({
    username: Joi.string().required().messages({
        'string.empty': 'Username is required',
    }),
    enc_password: Joi.string().required().messages({
        'string.empty': 'Password is required',
    }),
    ip: Joi.string().required(),
    optIntoOneTap: Joi.boolean().default(false),
});
