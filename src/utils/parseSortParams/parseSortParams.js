import { SORT_BY, SORT_ORDER } from '../../constants/index.js';
import { parseSortBy } from './parseSortBy.js';
import { parseSortOrder } from './parseSortOrder.js';

export const parseSortParams = ({ sortBy, sortOrder }) => {
  const parsedSortBy = parseSortBy(sortBy, SORT_BY);
  const parsedSortOrder = parseSortOrder(sortOrder, SORT_ORDER);
  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
