import Joi from 'joi';
import { EMAIL_REGEXP } from '../constants/index.js';

export const userValidationSchemaSignUp = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().required().pattern(EMAIL_REGEXP),
  password: Joi.string().required(),
});

export const userValidationSchemaSignIn = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEXP).required(),
  password: Joi.string().required(),
});
