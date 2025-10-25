import createHttpError from 'http-errors';
import { UserModel } from '../../db/model/UserModel.js';
import { compare, hash } from 'bcrypt';
import { SessionModel } from '../../db/model/SessionModel.js';
import { sessionSettings } from '../../utils/sessionSettings.js';

export const signup = async (payload) => {
  const hashPassword = await hash(payload.password, 10);
  payload.password = hashPassword;

  const user = await UserModel.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(
      409,
      `acount with ${payload.email} email already exist`,
    );
  }

  const data = await UserModel.create(payload);
  delete data._doc.password;

  return data._doc;
};

export const signin = async (payload) => {
  const { email, password } = payload;

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'email or password invalid');
  }

  const passwordCompare = await compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'email or password invalid');
  }
  await SessionModel.deleteOne({ userId: user._id });

  const sessionToken = sessionSettings();

  const userSession = await SessionModel.create({
    userId: user._id,
    ...sessionToken,
  });

  return userSession;
};

export const refresh = async (cookies) => {
  const { refreshToken, sessionId } = cookies;
  const oldSession = await SessionModel.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!oldSession) throw createHttpError(401, 'Session not found');

  if (new Date() > oldSession.refreshTokenValidUntil)
    throw createHttpError(401, 'Session token expired');

  await SessionModel.deleteOne({ _id: sessionId });

  const sessionConfig = sessionSettings();

  const userSession = await SessionModel.create({
    userId: oldSession.userId,
    ...sessionConfig,
  });
  return userSession;
};

export const signout = async (sessionId) => {
  const deleteSession = await SessionModel.findOneAndDelete(sessionId);
  return deleteSession;
};
