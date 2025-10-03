import express from 'express';
import { env } from './utils/env.js';
import cors from 'cors';

const port = env('PORT');
export const startServer = () => {
  const app = express();

  app.use(cors());

  app.use((_req, res) => {
    res.status(404).json({
      message: 'Rout nit found',
    });
  });

  app.listen(port, () => {
    console.log(`Старт сервера на порту ${port}`);
  });
};
