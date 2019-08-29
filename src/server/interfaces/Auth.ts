import { Request } from 'express';

export interface IResponseBody {
  ok: boolean;
  access_token: string;
  scope: string;
  user_id: string;
  team_name: string;
  team_id: string;
  error?: string;
}

export interface IJWT {
  token: string;
  userId: string;
}

export interface ICustomRequest extends Request {
  decoded: IJWT;
}
