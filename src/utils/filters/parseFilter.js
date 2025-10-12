import { CONTACT_TYPE, SORT_BY } from '../../constants/index.js';

export const parseFilter = ({ contactType, contactTypeValue, isFavorite }) => {
  const parseContactType = contactType === SORT_BY[3] ? contactType : undefined;
  const parseContactTypeValue = CONTACT_TYPE.includes(contactTypeValue)
    ? contactTypeValue
    : undefined;

  const parseIsFavorite = ['true', 'false'].includes(isFavorite)
    ? isFavorite
    : undefined;

  return {
    contactType: parseContactType,
    contactTypeValue: parseContactTypeValue,
    isFavorite: parseIsFavorite,
  };
};
