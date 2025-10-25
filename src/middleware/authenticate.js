import createHttpError from 'http-errors';
import { SessionModel } from '../db/model/SessionModel.js';
import { UserModel } from '../db/model/UserModel.js';

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return next(createHttpError(401, 'Authorization header not found'));

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer')
    return next(createHttpError(401, 'Invalid authorization format'));

  const session = await SessionModel.findOne({ accesToken: token });
  if (!session) return next(createHttpError(401, 'Session not found'));
  if (new Date(Date.now()) > session.accesTokenValidUntil)
    return next(createHttpError(401, 'Access token expired'));

  const user = await UserModel.findOne({ _id: session.userId });
  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }
  req.user = user;
  next();
};
