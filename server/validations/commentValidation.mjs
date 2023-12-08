import Joi from 'joi';

export const commentValidation = Joi.object({
    text: Joi.string().alphanum().min(1).max(400).required()
});

