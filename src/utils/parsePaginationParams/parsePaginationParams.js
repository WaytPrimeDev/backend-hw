import { parseInteger } from './parseInt.js';

export const parsePaginationParams = ({ page, perPage }) => {
  const parsePage = parseInteger(page, 1);
  const parsePerPage = parseInteger(perPage, 5);
  return {
    page: parsePage,
    perPage: parsePerPage,
  };
};
