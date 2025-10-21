import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoConnect = async () => {
  try {
    const DBURL = env('DB_URL');

    await mongoose.connect(DBURL);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('error mongoDB');

    throw new Error(error.message);
  }
};
