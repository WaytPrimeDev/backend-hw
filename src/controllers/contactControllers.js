import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contactSlice/contactServices.js';
import { parsePaginationParams } from '../utils/parsePaginationParams/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams/parseSortParams.js';
import { parseFilter } from '../utils/filters/parseFilter.js';

export const getAllContactController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = parseFilter(req.query);
  const userId = req.user._id;

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter: { ...filter, userId },
  });

  if (!contacts) {
    throw createHttpError(404, 'contacts not found');
  }
  res.json({
    status: 200,
    ...contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;

  const contact = await getContactById({ id, userId });

  if (!contact) throw createHttpError(404, `contact with id ${id} not found`);

  res.json({
    status: 200,
    contact,
  });
};

export const createContactController = async (req, res) => {
  const userId = req.userId;
  const newContact = await createContact({ ...req.body, userId });

  if (!newContact) throw createHttpError(500, 'contact don`t create');

  res.status(201).json({
    status: 201,
    newContact,
  });
};

export const updateContactController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;

  const result = await updateContact({ id, userId }, req.body);

  if (!result) throw createHttpError(404, `contact with id ${id} not found`);

  res.status(200).json({
    status: 200,
    result,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const result = await deleteContact(id);

  if (!result) throw createHttpError(404, `contact with id ${id} not found`);

  res.status(204).send();
};
