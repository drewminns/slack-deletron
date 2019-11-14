export interface IFileListResponse {
  ok: boolean;
  files: IFileResponse[];
  error?: string;
  paging?: IPagingResponse;
}

export interface IPagingResponse {
  count?: number;
  total: number;
  page?: number;
  pages?: number;
}

export interface IFileDeleteResponse {
  ok: boolean;
}

export interface IFileDeletePayload {
  error?: string;
  success: boolean;
  file_id: string;
}

export interface IFileInfoResponse {
  ok: boolean;
  file: IFileResponse;
  comments: [];
  response_metadata: {
    next_cursor?: string | null;
  };
  error?: string;
}

export interface IFileResponse {
  id: string;
  created: number;
  timestamp: number;
  name: string;
  title: string;
  mimetype: string;
  filetype: string;
  pretty_type: string;
  user: string;
  editable: boolean;
  size: number;
  mode: string;
  is_external: boolean;
  external_type: string;
  is_public: boolean;
  public_url_shared: boolean;
  display_as_bot: boolean;
  username: string;
  url_private: string;
  url_private_download: string;
  thumb_64: string;
  thumb_80: string;
  thumb_360: string;
  thumb_360_w: boolean;
  thumb_360_h: boolean;
  thumb_480: string;
  thumb_480_w: boolean;
  thumb_480_h: boolean;
  thumb_160: string;
  thumb_720: string;
  thumb_720_w: boolean;
  thumb_720_h: boolean;
  thumb_800: string;
  thumb_800_w: boolean;
  thumb_800_h: boolean;
  thumb_960: string;
  thumb_960_w: boolean;
  thumb_960_h: boolean;
  thumb_1024: string;
  thumb_1024_w: boolean;
  thumb_1024_h: boolean;
  original_w: number;
  original_h: number;
  permalink: string;
  permalink_public: string;
  channels: [];
  groups: [];
  ims: string[];
  comments_count: number;
}

export interface IFilePayload {
  file_list: IFileItem[];
  paging: IPagingResponse;
  channel: string;
  user: string;
  count: number;
}

export interface IFileItem {
  id: string;
  created: Date;
  title: string;
  type: string;
  user: string;
  is_file_owner: boolean;
  is_public: boolean;
  image: string;
  size: number;
}
