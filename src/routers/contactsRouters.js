import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactController,
  getContactByIdController,
  updateContactController,
} from '../controllers/contactControllers.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validationBody } from '../utils/validationsBody.js';
import {
  contactsAddSchema,
  contactsUpdateSchema,
} from '../validations/contactValidationSchema.js';
import { validateId } from '../middleware/validateId.js';
import { authenticate } from '../middleware/authenticate.js';

export const contactRouter = Router();

contactRouter.use(ctrlWrapper(authenticate));

contactRouter.get('/', ctrlWrapper(getAllContactController));

contactRouter.get('/:id', validateId, ctrlWrapper(getContactByIdController));

contactRouter.post(
  '/',
  validationBody(contactsAddSchema),
  ctrlWrapper(createContactController),
);

contactRouter.patch(
  '/:id',
  validationBody(contactsUpdateSchema),
  ctrlWrapper(updateContactController),
);

contactRouter.delete('/:id', ctrlWrapper(deleteContactController));
