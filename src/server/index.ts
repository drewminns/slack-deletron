import { AppServer } from './Server';

import { SERVER_PORT } from './config';

const appServer = new AppServer();

appServer.start(SERVER_PORT);
