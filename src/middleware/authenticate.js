import createHttpError from 'http-errors';
import { SessionModel } from '../db/model/SessionModel.js';
import { UserModel } from '../db/model/UserModel.js';

export const authenticate = async (req, res, next) => {
  const [bearer, token] = (req.headers.authorization || '').split(' ');

  if (bearer !== 'Bearer')
    throw createHttpError(401, 'token authorization must be have ');
  const { sessionId } = req.cookies;
  if (!sessionId) {
    return next(createHttpError(401, 'not authorized'));
  }

  const session = await SessionModel.findOne({ _id: sessionId });
  if (!session) throw createHttpError(401, 'not authorized');

  const user = await UserModel.findOne({ _id: session.userId });
  if (!user) throw createHttpError(401, 'not authorized');

  req.user = user;
  req.session = session;
  next();
};
