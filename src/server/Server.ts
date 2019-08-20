import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { SlackAuthController } from './controllers/SlackAuth';

import {
  CLIENT_ID,
  CLIENT_SECRET,
  PATH_URI,
  REDIRECT_URI,
  SCOPE,
  SLACK_OAUTH_URI
} from './utils/config';

export class AppServer extends Server {
  private SERVER_STARTED: string = 'Example server started on port: ';

  constructor() {
    super(true);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(helmet.xssFilter());
    this.setupControllers();
  }

  start(port: number): void {
    this.app.listen(port, () => {
      Logger.Imp(`${this.SERVER_STARTED} ${port}`);
    });
  }

  private setupControllers(): void {
    const exampleController = new SlackAuthController(
      PATH_URI as string,
      CLIENT_ID as string,
      SCOPE as string,
      CLIENT_SECRET as string,
      REDIRECT_URI as string,
      SLACK_OAUTH_URI as string
    );
    super.addControllers([exampleController]);
  }
}
