import createHttpError from 'http-errors';
import { UserModel } from '../db/model/UserModel.js';
import {
  logout,
  refresh,
  signin,
  signup,
} from '../services/userSlice/userSlice.js';
import { hash } from 'bcrypt';

import { REFRESH_TOKEN_VALID_UNTIL } from '../constants/index.js';

export const signupController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) return next(createHttpError(409, `user with email ${email} found`));

  const hashPassword = await hash(password, 10);

  const data = await signup({ ...req.body, password: hashPassword });
  delete data.password;

  res.status(201).json({
    status: 201,
    data,
    message: 'account was create',
  });
};

export const signinController = async (req, res) => {
  const session = await signin(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN_VALID_UNTIL),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN_VALID_UNTIL),
  });

  res.json({
    status: 200,
    message: 'signin successfully',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshController = async (req, res) => {
  const refreshSession = await refresh({
    refreshToken: req.cookies.refreshToken,
    sessionId: req.cookies.sessionId,
  });

  res.cookie('refreshToken', refreshSession.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN_VALID_UNTIL),
  });

  res.cookie('sessionId', refreshSession._id, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN_VALID_UNTIL),
  });

  res.json({
    status: 200,
    data: {
      accessToken: refreshSession.accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  if (!req.cookies?.sessionId) throw createHttpError(401, 'not authorized');
  const deleteSession = await logout(req.cookies.sessionId);
  if (!deleteSession) throw createHttpError(401, 'session not found');
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');
  res.status(204).send();
};
