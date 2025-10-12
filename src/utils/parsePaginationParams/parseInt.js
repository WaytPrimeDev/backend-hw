export const parseInteger = (num, defNum) => {
  if (typeof num !== 'string') return defNum;

  const parseValue = Math.floor(num);
  if (Number.isNaN(parseValue) || parseValue <= 0) return defNum;

  return parseValue;
};
