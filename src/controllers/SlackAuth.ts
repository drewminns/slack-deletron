import { Controller, Get, Middleware } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import request, { ResponseRequest } from 'request';
import url from 'url';

interface IResponseBody {
  ok: boolean;
  access_token: string;
  scope: string;
  user_id: string;
  team_name: string;
  team_id: string;
}

@Controller('auth/slack')
export class SlackAuthController {
  private REDIRECT_URL: string;

  constructor(
    private PATH_URI: string,
    private CLIENT_ID: string,
    private SCOPE: string,
    private CLIENT_SECRET: string,
    private REDIRECT_URI: string,
    private SLACK_OAUTH_URI: string
  ) {
    this.REDIRECT_URL = this.generateRedirectURI();
  }

  private generateRedirectURI(): string {
    return url.format({
      pathname: this.PATH_URI,
      query: { client_id: this.CLIENT_ID, scope: this.SCOPE }
    });
  }

  private generateSlackOAuthURI(code: string): string {
    return url.format({
      pathname: this.SLACK_OAUTH_URI,
      query: {
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET,
        code,
        redirect_uri: this.REDIRECT_URI
      }
    });
  }

  private fetchUserProfile(): void {
    // To Do. Fetch User Profile
    // .get('https://slack.com/api/users.info', {
    //     params: {
    //       token,
    //       user,
    //     },
    //   })
  }

  @Get('')
  private handleSlackAuth(req: Request, res: Response): void {
    res.status(302).redirect(this.REDIRECT_URL);
  }

  @Get('redirect')
  private handleSlackRedirect(req: Request, res: Response): void {
    const uri: string = this.generateSlackOAuthURI(req.query.code);

    try {
      request(
        { uri, method: 'GET' },
        (error, response, body: string): void => {
          const JSONRes: IResponseBody = JSON.parse(body);
          if (!JSONRes.ok) {
            res.status(200).json({ error: JSON.stringify(JSONRes) });
            return;
          } else {
            res.json(JSONRes);
          }
        }
      );
    } catch (err) {
      res.status(200).json({ error: err });
    }
  }
}
