import { Controller, Get, ClassMiddleware } from '@overnightjs/core';
import { AxiosResponse } from 'axios';
import { Response, Request } from 'express';
import { fromUnixTime, getUnixTime, parse } from 'date-fns';
import { verifyToken } from '../middleware';
import { getData } from '../utils';
import { Logger } from '@overnightjs/logger';
import {
  ICustomRequest,
  IFileListResponse,
  IFileInfoResponse,
  IFileItem,
  IFileDeleteResponse,
} from '../../shared/interfaces';

function convertDateStringToUnix(date: string): number {
  return getUnixTime(parse(date, 'yyyy-MM-dd', new Date()));
}

@Controller('api/files')
@ClassMiddleware([verifyToken])
export class SlackFileController {
  @Get('')
  private async getFilesList(request: Request, res: Response) {
    const req = request as ICustomRequest;
    try {
      const { startDate, endDate, channel, user, types, page } = req.query;
      const files: AxiosResponse<IFileListResponse> = await getData('files.list', req.decoded, {
        ts_to: convertDateStringToUnix(startDate),
        ts_from: convertDateStringToUnix(endDate),
        count: 50,
        page,
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
          size: file.size,
        }))
        .sort((a, b) => {
          return b.created.getTime() - a.created.getTime();
        });

      return res.send({
        file_list: fileResponse,
        paging: files.data.paging,
        channel,
        user,
      });
    } catch (err) {
      Logger.Err('Error Fetching File List', err);
      return res.send({ success: false, message: err });
    }
  }

  @Get(':file_id')
  private async getFileInfo(request: Request, res: Response) {
    const req = request as ICustomRequest;

    try {
      if (!req.params.file_id) {
        return res.send({ success: false, message: 'File ID not Provided' });
      }
      const file: AxiosResponse<IFileInfoResponse> = await getData('files.info', req.decoded, {
        file: req.params.file_id,
      });

      if (!file.data.ok) {
        res.status(401).send({ error: file.data.error });
        return;
      }

      return res.send(file.data);
    } catch (err) {
      Logger.Err('Error Fetching File by ID', err);
      return res.send({ success: false, message: err });
    }
  }

  @Get('delete/:file_id')
  private async deleteFileById(request: Request, res: Response) {
    const req = request as ICustomRequest;

    try {
      if (!req.params.file_id) {
        return res.send({ success: false, message: 'File ID not Provided' });
      }

      const result: AxiosResponse<IFileDeleteResponse> = await getData('files.delete', req.decoded, {
        file: req.params.file_id,
      });

      if (!result.data.ok) {
        res.status(200).send({ error: 'Error deleting file', file_id: req.params.file_id, success: false });
      }

      return res.send({ file_id: req.params.file_id, success: true });
    } catch (err) {
      Logger.Err('Error deleting File by ID', err);
      return res.send({ success: false, message: err });
    }
  }
}
