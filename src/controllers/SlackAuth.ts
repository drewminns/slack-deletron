import { Controller, Get } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import url from 'url';
import { IResponseBody, IUser } from '../interfaces';

@Controller('auth/slack')
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

  private fetchUserProfile(token: string, user: string): Promise<AxiosPromise> {
    Logger.Info('Fetching users.info');
    return axios.get('https://slack.com/api/users.info', {
      params: {
        token,
        user,
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
          const bodyResponse = response.data as IResponseBody;
          if (!bodyResponse.ok) {
            // * To do - add in route to handle error */
            Logger.Warn(`OAuth returned error. Error: ${bodyResponse.error}`);
            res.status(401).send({ error: bodyResponse.error });
            return;
          } else {
            try {
              const profile: AxiosResponse<IUser> = await this.fetchUserProfile(
                bodyResponse.access_token,
                bodyResponse.user_id,
              );
              if (!profile.data.ok) {
                Logger.Warn(
                  `User profile data returned with an error. METHOD: users.info, Error: ${
                    profile.data.error
                  }`,
                );
                res.status(401).send({ error: profile.data.error });
              }

              res.json({ ...bodyResponse, ...profile.data.user });
            } catch (err) {
              Logger.Warn('Fetching data from users.info');
              res.status(401).send({ error: err });
            }
          }
        },
      );
    } catch (err) {
      Logger.Warn('Slack Auth Redirect failed miserably');
      res.status(200).json({ error: err });
    }
  }
}
