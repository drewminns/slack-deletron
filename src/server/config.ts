import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();
let pathURI;
switch (process.env.NODE_ENV) {
  case 'test':
    pathURI = path.join(__dirname, '..', '..', '.env.test');
    break;
  default:
    pathURI = path.join(__dirname, '..', '..', '.env.development');
}

dotenv.config({ path: pathURI });

export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const REDIRECT_URI = process.env.REDIRECT_URI;
export const SCOPE = process.env.SCOPE;
export const PATH_URI = 'https://slack.com/oauth/authorize';
export const SLACK_OAUTH_URI = 'https://slack.com/api/oauth.access';
export const PORT = parseInt(process.env.PORT as string, 10);
export const TOKEN_KEY = process.env.TOKEN_KEY as string;
