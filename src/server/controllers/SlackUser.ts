import { Controller, Get, ClassMiddleware } from '@overnightjs/core';
import { AxiosResponse } from 'axios';
import { Response, Request } from 'express';
import { verifyToken } from '../middleware';
import {
  ICustomRequest,
  IUser,
  IConversationsList,
  IChannelResponse,
  IFilteredChannels,
  IUserProfile,
  IUserReponse,
  IIMResponse,
} from '../../shared/interfaces';
import { getData } from '../utils';
import { Logger } from '@overnightjs/logger';

@Controller('api/user')
@ClassMiddleware([verifyToken])
export class SlackUserController {
  // Single Endpoint to
  @Get('profile')
  private async getUserProfile(request: Request, res: Response) {
    const req = request as ICustomRequest;
    try {
      const profile: AxiosResponse<IUser> = await getData('users.info', req.decoded, { user: req.decoded.userId });

      if (!profile.data.ok) {
        res.status(401).send({ error: profile.data.error });
        return;
      }
      const { user } = profile.data;
      const userResponse: IUserReponse = {
        id: user.id,
        real_name: user.real_name,
        admin: user.is_admin,
        updated: user.updated,
        team_id: user.team_id,
        display_name: user.profile.display_name,
        avatar_original: user.profile.image_original,
        avatar_512: user.profile.image_512,
        avatar_72: user.profile.image_72,
        first_name: user.profile.first_name,
        last_name: user.profile.last_name,
      };
      res.json(userResponse);
    } catch (err) {
      Logger.Err('Error Fetching User Profile', err);
      return res.send({ success: false, message: err });
    }
  }

  @Get('channels')
  private async getChannels(request: Request, res: Response) {
    const req = request as ICustomRequest;
    try {
      const channels: AxiosResponse<IConversationsList> = await getData('conversations.list', req.decoded, {
        types: 'public_channel,private_channel,im, mpim',
      });

      if (!channels.data.ok) {
        res.status(401).send({ error: channels.data.error });
        return;
      }

      const channelsList: IChannelResponse[] = [];
      const IMList: IIMResponse[] = [];
      channels.data.channels.forEach((channel: IChannelResponse | IIMResponse) => {
        if (channel.is_im) {
          IMList.push(channel as IIMResponse);
        } else {
          channelsList.push(channel as IChannelResponse);
        }
      });

      const fetchedIMNames = await IMList.map(async (channel: IIMResponse) => {
        const userInfo: AxiosResponse<IUser> = await getData('users.info', req.decoded, {
          user: channel.user,
        });

        if (userInfo.data.ok) {
          return {
            ...channel,
            user_name: userInfo.data.user.real_name,
          };
        }
      });

      Promise.all(fetchedIMNames).then(fetchImResultNames => {
        res.json({ channels: channelsList, ims: fetchImResultNames });
      });
    } catch (err) {
      Logger.Err('Error Fetching User Channels', err);
      return res.send({ success: false, message: err });
    }
  }

  @Get('details')
  private async getUserDetails(request: Request, res: Response) {
    const req = request as ICustomRequest;
    try {
      const channelsRequest: AxiosResponse<IConversationsList> = await getData('conversations.list', req.decoded, {
        types: 'public_channel,private_channel,im, mpim',
      });
      const profileRequest: AxiosResponse<IUser> = await getData('users.info', req.decoded, {
        userid: req.decoded.userId,
      });

      Promise.all([channelsRequest, profileRequest]).then(results => {
        const channelsData: IConversationsList = results[0].data;
        const profileData = results[1].data;
        if (!channelsData.ok || !profileData.ok) {
          res.status(401).send({ success: false, error: 'Error fetching User Details' });
        }
        const channels = this.filterChannels(channelsData.channels as IChannelResponse[]);
        const profile = this.cleanProfile(profileData.user);
        res.send({ profile, channels });
      });
    } catch (err) {
      Logger.Err('Error Fetching User Details', err);
      return res.send({ success: false, message: err });
    }
  }

  private cleanProfile(profile: IUser['user']): IUserProfile {
    return {
      userId: profile.id,
      name: profile.name,
      real_name: profile.profile.real_name_normalized,
      display_name: profile.profile.display_name_normalized,
      image: profile.profile.image_1024,
      is_admin: profile.is_admin,
      is_owner: profile.is_owner,
    };
  }

  private filterChannels(channels: IChannelResponse[]): IFilteredChannels[] {
    return channels.map(({ id, name, is_channel, is_group, is_archived, is_private, created, creator }) => {
      return {
        id,
        name,
        is_channel,
        is_group,
        is_archived,
        is_private,
        creator,
        created,
      };
    });
  }
}
