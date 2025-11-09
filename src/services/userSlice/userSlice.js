import createHttpError from 'http-errors';

import { UserModel } from '../../db/model/UserModel.js';

import { compare } from 'bcrypt';
import { createSession } from '../../utils/createSession.js';
import { SessionModel } from '../../db/model/SessionModel.js';

export const signup = async (data) => {
  const user = await UserModel.create(data);
  if (!user) throw createHttpError(409, 'user not create');
  return data;
};

export const signin = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw createHttpError(401, 'email or password not correct');

  const validPassword = await compare(password, user.password);
  if (!validPassword)
    throw createHttpError(401, 'password or email not correct');

  await SessionModel.deleteOne({ userId: user._id });

  const session = createSession();
  const postSession = await SessionModel.create({
    userId: user.id,
    ...session,
  });

  if (!postSession) throw createHttpError(401, 'Session not create');

  return postSession;
};

export const refresh = async ({ sessionId, refreshToken }) => {
  const oldSession = await SessionModel.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!oldSession) throw createHttpError(401, 'session not found');
  if (new Date() > new Date(oldSession.refreshTokenValidUntil))
    throw createHttpError(401, 'session expired');

  await SessionModel.deleteOne({ _id: sessionId, refreshToken });

  const session = createSession();

  const newSession = await SessionModel.create({
    userId: oldSession.userId,
    ...session,
  });
  return newSession;
};

export const logout = async (sessionId) => {
  const deleteSession = SessionModel.findOneAndDelete({ _id: sessionId });
  return deleteSession;
};
