import { signup } from '../services/userSlice/userSlice.js';

export const signupController = async (req, res) => {
  const data = await signup(req.body);

  res.status(201).json({
    status: 201,
    message: 'account create',
    data,
  });
};
