import { Router } from 'express';
import { signupController } from '../controllers/authController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validationBody } from '../utils/validationsBody.js';
import { userValidationSchemaSignUp } from '../validations/userValidationSchema.js';

export const authRouter = Router();

authRouter.post(
  '/signup',
  validationBody(userValidationSchemaSignUp),
  ctrlWrapper(signupController),
);
