export const parseSortOrder = (sortOrder, sortOrderList) => {
  return sortOrderList.includes(sortOrder) ? sortOrder : sortOrderList[0];
};
