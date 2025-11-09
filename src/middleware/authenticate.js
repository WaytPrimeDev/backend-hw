import createHttpError from 'http-errors';

export const authenticate = (req, res, next) => {
  if (!req.cookies?.sessionId) {
    return next(createHttpError(401, 'not authorized'));
  }
};
