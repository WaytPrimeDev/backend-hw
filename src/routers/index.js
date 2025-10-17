import { Router } from 'express';
import { contactRouter } from './contactsRouters.js';
import { authRouter } from './authRouter.js';

export const router = Router();

router.use('/contacts', contactRouter);
router.use('/auth', authRouter);
