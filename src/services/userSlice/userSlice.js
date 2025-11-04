import createHttpError from 'http-errors';

import { UserModel } from '../../db/model/userModel.js';

export const signup = async (data) => {
  const user = await UserModel.create(data);
  if (!user) throw createHttpError(409, 'user not create');
  return data;
};
