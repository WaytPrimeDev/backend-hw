import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validationBody } from '../utils/validationsBody.js';
import { signupSchema } from '../validations/authValidationSchema.js';
import { signupController } from '../controllers/authController.js';

export const authRouter = Router();

authRouter.post(
  '/signup',
  validationBody(signupSchema),
  ctrlWrapper(signupController),
);
