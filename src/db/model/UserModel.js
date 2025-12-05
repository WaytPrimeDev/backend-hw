import { model, Schema } from 'mongoose';
import { EMAIL_REGEXP } from '../../constants/index.js';
import { errorSaveHandler, updateSettings } from '../hooks/hooks.js';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      required: true,
      unique: true,
      type: String,
      match: EMAIL_REGEXP,
    },
    password: {
      type: String,
      required: true,
    },
    verification: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.post('save', errorSaveHandler);
userSchema.post('findOneAndUpdate', errorSaveHandler);
userSchema.pre('findOneAndUpdate', updateSettings);

export const UserModel = model('user1', userSchema);
