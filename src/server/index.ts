import { AppServer } from './Server';

import { PORT } from './config';

const appServer = new AppServer();

appServer.start(PORT);
