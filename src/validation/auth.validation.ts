import Joi from 'joi';

export const auth = {
    body: Joi.object().keys({
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
    }),
};

export const favorite = {
    body: Joi.object().keys({
        favorites: Joi.array().items(Joi.string()),
    }),
};
