import Joi from 'joi';
import { CONTACT_TYPE } from '../constants/index.js';

export const contactsAddSchema = Joi.object({
  name: Joi.string().min(3).max(40).required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().email().required().messages({
    'string.email': 'email must have to be email',
    'string.empty': 'email don`t be void',
    'any.required': 'email is requaired!',
  }),
  isFavorite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...CONTACT_TYPE)
    .required(),
});

export const contactsUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(40),
  phoneNumber: Joi.string(),
  email: Joi.string().email(),
  isFavorite: Joi.boolean(),
  contactType: Joi.string().valid(...CONTACT_TYPE),
});
