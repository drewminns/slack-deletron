import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();
let pathURI;

if (process.env.NODE_ENV === 'test') {
  pathURI = path.join(__dirname, '..', '..', '.env.test');
} else if (process.env.NODE_ENV === 'dev') {
  pathURI = path.join(__dirname, '..', '..', '.env.development');
}

dotenv.config({ path: pathURI });

export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const REDIRECT_URI = process.env.REDIRECT_URI;
export const SCOPE = process.env.SCOPE;
export const PATH_URI = 'https://slack.com/oauth/authorize';
export const SLACK_OAUTH_URI = 'https://slack.com/api/oauth.access';
export const SERVER_PORT = parseInt(process.env.PORT as string, 10);
export const TOKEN_KEY = process.env.TOKEN_KEY as string;
export const CLIENT_URL = process.env.CLIENT_URL || '/';
