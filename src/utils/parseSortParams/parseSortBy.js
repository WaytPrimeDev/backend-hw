export const parseSortBy = (sortBy, sortByList) => {
  if (typeof sortBy !== 'string') return sortByList[0];
  if (sortByList.includes(sortBy)) return sortBy;
  return sortByList[0];
};
