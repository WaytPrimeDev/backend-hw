import express from 'express';
import cors from 'cors';

import { env } from './utils/env.js';

import { notFoundRouterHandler } from './middleware/notFoundRouterHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { router } from './routers/index.js';
import cookieParser from 'cookie-parser';

const port = env('PORT');
export const startServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.use(router);

  app.use(notFoundRouterHandler);
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Старт сервера на порту ${port}`);
  });
};
