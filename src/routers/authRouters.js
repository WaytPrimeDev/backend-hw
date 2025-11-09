import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validationBody } from '../utils/validationsBody.js';
import {
  signinSchema,
  signupSchema,
} from '../validations/authValidationSchema.js';
import {
  logoutController,
  refreshController,
  signinController,
  signupController,
} from '../controllers/authController.js';

export const authRouter = Router();

authRouter.post(
  '/signup',
  validationBody(signupSchema),
  ctrlWrapper(signupController),
);
authRouter.post(
  '/signin',
  validationBody(signinSchema),
  ctrlWrapper(signinController),
);

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/logout', ctrlWrapper(logoutController));
