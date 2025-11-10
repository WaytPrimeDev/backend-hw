import createHttpError from 'http-errors';
import { SessionModel } from '../db/model/SessionModel.js';
import { UserModel } from '../db/model/UserModel.js';

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    throw createHttpError(401, 'invalid authorization format');

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer')
    throw createHttpError(401, 'invalid authorization format');
  const { sessionId } = req.cookies;
  if (!sessionId) {
    return next(createHttpError(401, 'not authorized'));
  }

  const session = await SessionModel.findOne({
    _id: sessionId,
    accessToken: token,
  });
  if (!session) throw createHttpError(401, 'not authorized');

  if (session.refreshTokenValidUntil < Date.now())
    throw createHttpError(401, 'token expired');

  const user = await UserModel.findOne({ _id: session.userId });
  if (!user) throw createHttpError(401, 'not authorized');
  console.log(session.refreshTokenValidUntil);

  req.user = user;
  req.session = session;
  next();
};
