export interface IResponseBody {
  ok: boolean;
  access_token: string;
  scope: string;
  user_id: string;
  team_name: string;
  team_id: string;
  error?: string;
}
