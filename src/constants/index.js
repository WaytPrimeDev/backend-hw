export const CONTACT_TYPE = ['work', 'home', 'personal'];
export const SORT_ORDER = ['asc', 'desc'];

export const SORT_BY = [
  'name',
  'email',
  'isFavorite',
  'contactType',
  'phoneNumber',
];

export const EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const ACCESS_TOKEN_VALID_UNTIL = 1000 * 15 * 60;
export const REFRESH_TOKEN_VALID_UNTIL = 1000 * 60 * 60 * 24;
