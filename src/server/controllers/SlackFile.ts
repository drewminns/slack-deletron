// https://api.slack.com/methods/files.info
// https://api.slack.com/methods/files.delete
// https://api.slack.com/methods/files.list

// This method uses cursor-based pagination to make it easier to incrementally collect information. To begin pagination, specify a limit value under 1000. We recommend no more than 200 results at a time.
// https://slack.com/api/files.list?limit=200&cursor=c29scl9jdXJzb3JtYXJrOkFvRStabWxzWlY4ME1USXhNalV4TXpjek9UbGZOREkxTXpNM01qVXdOVGsxLjljNWY1NTk0OGE2ZTlmZmY5Yjk3MzZlYjc0ODI4MzJmNjQzNTk0MzRhNTI2YTYyYmYyMjA2OWE0Yjc2ZTEyMjM=

import { Controller, Get, ClassMiddleware } from '@overnightjs/core';
import { AxiosResponse } from 'axios';
import { Response, Request } from 'express';
import { fromUnixTime } from 'date-fns';
import { verifyToken } from '../middleware';
import { getData } from '../utils';
import { Logger } from '@overnightjs/logger';
import { ICustomRequest, IFileListResponse, IFileItem } from '../../shared/interfaces';

@Controller('api/files')
@ClassMiddleware([verifyToken])
export class SlackFileController {
  @Get('')
  private async getFilesList(request: Request, res: Response) {
    const req = request as ICustomRequest;
    try {
      const { from, to, channel, user, types } = req.params;
      const files: AxiosResponse<IFileListResponse> = await getData('files.list', req.decoded, {
        limit: 50,
        ts_from: from,
        ts_to: to,
        types,
        channel,
        user,
      });
      if (!files.data.ok) {
        res.status(401).send({ error: files.data.error });
        return;
      }

      const fileResponse: IFileItem[] = files.data.files
        .map(file => ({
          id: file.id,
          created: fromUnixTime(file.created),
          title: file.title,
          type: file.pretty_type,
          user: file.user,
          is_file_owner: file.user === req.decoded.userId,
          is_public: file.is_public,
          image: file.thumb_360,
        }))
        .sort((a, b) => {
          return b.created.getTime() - a.created.getTime();
        });

      return res.send({
        file_list: fileResponse,
        next_cursor: files.data.response_metadata.next_cursor,
        channel,
        user,
        count: files.data.files.length,
      });
    } catch (err) {
      Logger.Err('Error Fetching User Profile', err);
      return res.send({ success: false, message: err });
    }
  }
}
