import { Controller, Get, ClassMiddleware } from '@overnightjs/core';
import axios from 'axios';
import { Response, Request } from 'express';
import { verifyToken } from '../middleware';
import { ICustomRequest, IUser } from '../interfaces';

@Controller('api/user')
@ClassMiddleware([verifyToken])
export class SlackUserController {
  @Get('profile')
  private async getUserProfile(request: Request, response: Response) {
    const req = request as ICustomRequest;
    try {
      await axios
        .get('https://slack.com/api/users.info', {
          params: {
            token: req.decoded.token,
            user: req.decoded.userId,
          },
        })
        .then(({ data }: { data: IUser }) => {
          return response.json(data);
        });
    } catch (err) {
      return response.send({ success: false, message: err });
    }
  }

  @Get('channels')
  private async getChannels(request: Request, response: Response) {
    const req = request as ICustomRequest;
    try {
      await axios
        .get('https://slack.com/api/conversations.list', {
          params: {
            token: req.decoded.token,
            user: req.decoded.userId,
          },
        })
        .then(res => {
          return response.json(res.data);
        });
    } catch (err) {
      console.log(err);
      return response.send({ success: false, message: err });
    }
  }
}
