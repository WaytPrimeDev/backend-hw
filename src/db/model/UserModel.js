import { model, Schema } from 'mongoose';
import { EMAIL_REGEXP } from '../../constants/index.js';
import { errorSaveHandler, updateSettings } from '../hooks/hooks.js';

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    match: EMAIL_REGEXP,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.post('save', errorSaveHandler);
userSchema.post('findOneAndUpdate', errorSaveHandler);
userSchema.pre('findOneAndUpdate', updateSettings);

export const UserModel = model('User1', userSchema);
