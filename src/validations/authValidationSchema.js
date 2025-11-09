import Joi from 'joi';

import { EMAIL_REGEXP } from '../constants/index.js';

export const signupSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().required().pattern(EMAIL_REGEXP),
  password: Joi.string().min(3).max(16).required().messages({
    'any.required': 'password is required',
    'string.min': 'password length min is 3 symbol',
  }),
});
export const signinSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEXP).required(),
  password: Joi.string().required(),
});
