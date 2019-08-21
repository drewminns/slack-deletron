import { Controller, Get } from '@overnightjs/core';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';

@Controller('api')
export class GenericAuthController extends Server {
  @Get('')
  private handleSlackAuth(req: Request, res: Response): void {
    res.status(200).json({ working: 'perfectly' });
  }
}
