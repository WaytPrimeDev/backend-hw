import { Router } from 'express';
import {
  signinController,
  signupController,
} from '../controllers/authController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validationBody } from '../utils/validationsBody.js';
import {
  userValidationSchemaSignIn,
  userValidationSchemaSignUp,
} from '../validations/userValidationSchema.js';

export const authRouter = Router();

authRouter.post(
  '/signup',
  validationBody(userValidationSchemaSignUp),
  ctrlWrapper(signupController),
);

authRouter.post(
  '/signin',
  validationBody(userValidationSchemaSignIn),
  ctrlWrapper(signinController),
);
