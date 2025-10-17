import createHttpError from 'http-errors';
import { UserModel } from '../../db/model/UserModel.js';
import { hash } from 'bcrypt';

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
