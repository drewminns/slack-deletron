import { Controller, Get } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import url from 'url';
import { IAuthBody } from '../interfaces';
import { issueJWT } from '../middleware';
import { CLIENT_URL } from '../config';

@Controller('api/auth/slack')
export class SlackAuthController {
  private REDIRECT_URL: string;

  constructor(
    private PATH_URI: string,
    private CLIENT_ID: string,
    private SCOPE: string,
    private CLIENT_SECRET: string,
    private REDIRECT_URI: string,
    private SLACK_OAUTH_URI: string,
  ) {
    this.REDIRECT_URL = this.generateRedirectURI();
  }

  private generateRedirectURI(): string {
    return url.format({
      pathname: this.PATH_URI,
      query: { client_id: this.CLIENT_ID, scope: this.SCOPE },
    });
  }

  private generateSlackOAuthURI(code: string): string {
    return url.format({
      pathname: this.SLACK_OAUTH_URI,
      query: {
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET,
        code,
        redirect_uri: this.REDIRECT_URI,
      },
    });
  }

  @Get('')
  private handleSlackAuth(req: Request, res: Response): void {
    res.status(302).redirect(this.REDIRECT_URL);
  }

  @Get('redirect')
  private async handleSlackRedirect(req: Request, res: Response): Promise<any> {
    const uri: string = this.generateSlackOAuthURI(req.query.code);
    try {
      await axios.get(uri).then(
        async (response: AxiosResponse): Promise<any> => {
          const bodyResponse = response.data as IAuthBody;
          if (!bodyResponse.ok) {
            // * To do - add in route to handle error */
            Logger.Warn(`OAuth returned error. Error: ${bodyResponse.error}`);
            res.status(401).send({ error: bodyResponse.error });
            return;
          } else {
            const token = await issueJWT(bodyResponse.access_token, bodyResponse.user_id);
            res.redirect(
              url.format({
                pathname: CLIENT_URL,
                query: {
                  token,
                },
              }),
            );
          }
        },
      );
    } catch (err) {
      Logger.Warn('Slack Auth Redirect failed miserably');
      res.status(200).json({ error: err });
    }
  }
}
