// https://api.slack.com/methods/files.info
// https://api.slack.com/methods/files.delete
// https://api.slack.com/methods/files.list

// This method uses cursor-based pagination to make it easier to incrementally collect information. To begin pagination, specify a limit value under 1000. We recommend no more than 200 results at a time.
// https://slack.com/api/files.list?limit=200&cursor=c29scl9jdXJzb3JtYXJrOkFvRStabWxzWlY4ME1USXhNalV4TXpjek9UbGZOREkxTXpNM01qVXdOVGsxLjljNWY1NTk0OGE2ZTlmZmY5Yjk3MzZlYjc0ODI4MzJmNjQzNTk0MzRhNTI2YTYyYmYyMjA2OWE0Yjc2ZTEyMjM=

import { Controller, Get, ClassMiddleware } from '@overnightjs/core';
import { AxiosResponse } from 'axios';
import { Response, Request } from 'express';
import { verifyToken } from '../middleware';
import { getData } from '../utils';
import { Logger } from '@overnightjs/logger';
import { ICustomRequest, IFileListResponse, IFilePayload } from '../../shared/interfaces';

@Controller('api/files')
@ClassMiddleware([verifyToken])
export class SlackFileController {
  @Get('')
  private async getFilesList(request: Request, res: Response) {
    const req = request as ICustomRequest;
    try {
      const files: AxiosResponse<IFileListResponse> = await getData(
        'files.list',
        req.decoded.token,
        req.decoded.userId,
      );
      if (!files.data.ok) {
        res.status(401).send({ error: files.data.error });
        return;
      }

      const fileResponse: IFilePayload[] = files.data.files.map(file => ({
        id: file.id,
        created: file.created,
        title: file.title,
        type: file.pretty_type,
        user: file.user,
        is_file_owner: file.user === req.decoded.userId,
        is_public: file.is_public,
        image: file.thumb_360,
      }));

      return res.send(fileResponse);
    } catch (err) {
      Logger.Err('Error Fetching User Profile', err);
      return res.send({ success: false, message: err });
    }
  }
}
