import { signin, signup } from '../services/userSlice/userSlice.js';

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

  res.json({
    status: 200,
    message: 'successfully signin',
    data: {
      accessToken: session.accesToken,
    },
  });
};
