export interface IChannelResponse {
  id: string;
  name: string;
  is_channel: boolean;
  is_group: boolean;
  is_im: boolean;
  created: number;
  creator: string;
  is_archived: boolean;
  is_general: boolean;
  unlinked: number;
  name_normalized: string;
  is_shared: boolean;
  is_ext_shared: boolean;
  is_org_shared: boolean;
  pending_shared: [];
  is_pending_ext_shared?: boolean;
  is_member: boolean;
  is_private: boolean;
  is_mpim: boolean;
  previous_names?: [];
  num_members: number;
  topi: IChannelDetails;
  purpose: IChannelDetails;
}

export interface IChannelDetails {
  value?: string;
  creator: string;
  last_set: number;
}

export interface IIM {
  id: string;
  is_org_shared: boolean;
  created: number;
  is_im: boolean;
  user: string;
  is_open?: boolean;
  is_user_deleted?: boolean;
  num_members: number;
  priority: number;
}

export interface IConversationsList {
  ok: boolean;
  channels: IChannelResponse[];
  error?: boolean;
  response_metadata: {
    next_cursor: string;
  };
}

export interface IFilteredChannels {
  id: string;
  name: string;
  is_channel: boolean;
  is_group: boolean;
  is_archived: boolean;
  is_private: boolean;
  creator: string;
  created: number;
}
