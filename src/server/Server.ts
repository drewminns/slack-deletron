import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import express from 'express';
import path from 'path';
import { SlackAuthController, GenericAuthController, SlackUserController, SlackFileController } from './controllers';

import { CLIENT_ID, CLIENT_SECRET, PATH_URI, REDIRECT_URI, SCOPE, SLACK_OAUTH_URI } from './config';

export class AppServer extends Server {
  private SERVER_STARTED = 'Example server started on port: ';

  constructor() {
    super(true);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(helmet.xssFilter());
    this.app.use(express.static(path.join(__dirname, '../client')));
    this.setupControllers();
  }

  start(port: number): void {
    this.app.listen(port, () => {
      Logger.Imp(`${this.SERVER_STARTED} ${port}`);
    });
  }

  private setupControllers(): void {
    const slackAuthController = new SlackAuthController(
      PATH_URI as string,
      CLIENT_ID as string,
      SCOPE as string,
      CLIENT_SECRET as string,
      REDIRECT_URI as string,
      SLACK_OAUTH_URI as string,
    );
    const genericController = new GenericAuthController();
    const slackUserController = new SlackUserController();
    const slackFileController = new SlackFileController();
    super.addControllers([slackAuthController, genericController, slackUserController, slackFileController]);
  }
}
