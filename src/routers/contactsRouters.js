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

export const router = Router();

router.get('/', ctrlWrapper(getAllContactController));

router.get('/:id', validateId, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  validationBody(contactsAddSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:id',
  validationBody(contactsUpdateSchema),
  ctrlWrapper(updateContactController),
);

router.delete('/:id', ctrlWrapper(deleteContactController));
