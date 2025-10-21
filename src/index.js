import { initMongoConnect } from './db/initMongoConnect.js';
import { startServer } from './server.js';

const bootstrap = async () => {
  await initMongoConnect();
  startServer();
};

bootstrap();
