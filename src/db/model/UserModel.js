import { model, Schema } from 'mongoose';
import { EMAIL_REGEXP } from '../../constants/index.js';

import { errorSaveHandler, updateSettings } from '../hooks/hooks.js';

const userSchemaSignUp = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      match: EMAIL_REGEXP,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);
userSchemaSignUp.post('save', errorSaveHandler);
userSchemaSignUp.post('findOneAndUpdate', errorSaveHandler);

userSchemaSignUp.pre('findOneAndUpdate', updateSettings);

export const UserModel = model('user', userSchemaSignUp);
