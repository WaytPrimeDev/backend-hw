import createHttpError from 'http-errors';
import { UserModel } from '../db/model/userModel.js';
import { signup } from '../services/userSlice/userSlice.js';

export const signupController = async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) next(createHttpError(409, `user with email ${email} found`));

  const data = await signup(req.body);

  res.json({
    status: 200,
    data,
    message: 'account was create',
  });
};
