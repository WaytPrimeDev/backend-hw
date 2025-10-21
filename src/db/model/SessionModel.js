import { model, Schema } from 'mongoose';
import { errorSaveHandler, updateSettings } from '../hooks/hooks.js';

const sesionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    accesToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accesTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

sesionSchema.post('save', errorSaveHandler);
sesionSchema.pre('findOneAndUpdate', updateSettings);
sesionSchema.post('findOneAndUpdate', updateSettings);

export const SessionModel = model('session', sesionSchema);
