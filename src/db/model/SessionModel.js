import { model, Schema } from 'mongoose';
import { errorSaveHandler, updateSettings } from '../hooks/hooks.js';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User1',
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

sessionSchema.post('save', errorSaveHandler);
sessionSchema.post('findOneAndUpdate', errorSaveHandler);
sessionSchema.pre('findOneAndUpdate', updateSettings);

export const SessionModel = model('session1', sessionSchema);
