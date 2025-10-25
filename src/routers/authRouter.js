import { Router } from 'express';
import {
  refreshController,
  signinController,
  signoutController,
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

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/signout', ctrlWrapper(signoutController));
