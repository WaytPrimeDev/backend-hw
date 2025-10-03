import { initMongoConnect } from './db/initMongoConntcet.js';
import { startServer } from './server.js';

const bootstrap = async () => {
  await initMongoConnect();
  startServer();
};

bootstrap();
