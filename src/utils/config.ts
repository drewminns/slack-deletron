import * as dotenv from 'dotenv';

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
  case 'test':
    path = `${__dirname}/../../.env.test`;
    break;
  default:
    path = `${__dirname}/../../.env.development`;
}
dotenv.config({ path });

export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const REDIRECT_URI = process.env.REDIRECT_URI;
export const SCOPE = process.env.SCOPE;
export const PATH_URI = 'https://slack.com/oauth/authorize';
export const SLACK_OAUTH_URI = 'https://slack.com/api/oauth.access';
export const PORT = parseInt(process.env.PORT as string, 10);
