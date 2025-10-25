import { SORT_BY } from '../../constants/index.js';
import { ContactModel } from '../../db/model/ContactModel.js';
import { calculatePaginationData } from '../../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter = {},
}) => {
  const skip = (page - 1) * perPage;

  const query = ContactModel.find();

  if (filter.contactType && filter.contactTypeValue) {
    query.where(SORT_BY[3]).equals(filter.contactTypeValue);
  }

  if (filter.isFavorite) {
    query.where(SORT_BY[2]).equals(filter.isFavorite);
  }

  if (filter.userId) {
    query.where('userId').equals(filter.userId);
  }

  const count = await query.clone().countDocuments();

  const data = await query
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const paginationData = calculatePaginationData({ count, page, perPage });

  return {
    data,
    ...paginationData,
  };
};

export const getContactById = async (filter) => {
  const contact = await ContactModel.findOne(filter);
  return contact;
};

export const createContact = async (payload) => {
  const newContact = await ContactModel.create(payload);
  return newContact;
};

export const updateContact = async ({ id, userId }, data, options = {}) => {
  const result = await ContactModel.findOneAndUpdate(
    { _id: id, userId },
    data,
    {
      new: true,
      ...options,
    },
  );

  return result;
};

export const deleteContact = async (id, userId) => {
  const result = await ContactModel.findOneAndDelete({ _id: id, userId });
  return result;
};
