import createHttpError from 'http-errors';

export const notFoundRouterHandler = () => {
  throw createHttpError(404, 'route not found');
};
