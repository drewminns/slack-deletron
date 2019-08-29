import { Controller, Get, Middleware } from '@overnightjs/core';
import axios, { AxiosResponse } from 'axios';
import { Response, Request } from 'express';
import { verifyToken } from '../utils/token';
import { ICustomRequest } from '../interfaces/Auth';

@Controller('api/user')
export class SlackUserController {
  @Get('')
  @Middleware([verifyToken])
  private async getUserProfile(request: Request, res: Response) {
    const req = request as ICustomRequest;
    try {
      await axios
        .get('https://slack.com/api/users.info', {
          params: {
            token: req.decoded.token,
            user: req.decoded.userId,
          },
        })
        .then((response: AxiosResponse) => {
          return res.json(response.data);
        });
    } catch (err) {
      return res.send({ success: false, message: err });
    }
  }
}
