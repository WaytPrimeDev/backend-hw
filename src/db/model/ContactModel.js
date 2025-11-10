import { model, Schema } from 'mongoose';
import { CONTACT_TYPE } from '../../constants/index.js';
import { errorSaveHandler, updateSettings } from '../hooks/hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, 'email must have'],
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: CONTACT_TYPE,
      required: true,
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User1',
      required: true,
    },
  },
  { timestamps: true },
);

contactSchema.post('save', errorSaveHandler);
contactSchema.post('findOneAndUpdate', errorSaveHandler);

contactSchema.pre('findOneAndUpdate', updateSettings);
export const ContactModel = model('Contact', contactSchema);
