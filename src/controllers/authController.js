import createHttpError from 'http-errors';
import {
  refresh,
  signin,
  signout,
  signup,
} from '../services/userSlice/userSlice.js';

export const signupController = async (req, res) => {
  const data = await signup(req.body);

  res.status(201).json({
    status: 201,
    message: 'account create',
    data,
  });
};

export const signinController = async (req, res) => {
  const session = await signin(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: new Date(Date.now() + session.refreshTokenValidUntil),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: new Date(Date.now() + session.refreshTokenValidUntil),
  });
  console.log(req.cookies);

  res.json({
    status: 200,
    message: 'successfully signin',
    data: {
      accessToken: session.accesToken,
    },
  });
};

export const refreshController = async (req, res) => {
  const cookies = req.cookies;

  const refreshSession = await refresh(cookies);

  res.cookie('refreshToken', refreshSession.refreshToken, {
    httpOnly: true,
    expire: new Date(Date.now + refreshSession.refreshTokenValidUntil),
  });
  res.cookie('sessionId', refreshSession._id, {
    httpOnly: true,
    expire: new Date(Date.now() + refreshSession.refreshTokenValidUntil),
  });

  res.json({
    status: 200,
    message: 'Successfully refresh session',
    data: {
      accesToken: refreshSession.accesToken,
    },
  });
};

export const signoutController = async (req, res) => {
  if (!req.cookies?.sessionId)
    throw createHttpError(401, 'session id not found');
  const deleteSession = signout(req.cookies);
  if (!deleteSession) throw createHttpError(401, 'session not found');

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
