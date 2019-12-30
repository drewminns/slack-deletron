export interface IProfile {
  title: string;
  phone: string;
  skype: string;
  real_name: string;
  real_name_normalized: string;
  display_name: string;
  display_name_normalized: string;
  status_text: string;
  status_emoji: string;
  status_expiration: number;
  avatar_hash: string;
  image_original: string;
  first_name: string;
  last_name: string;
  image_24: string;
  image_32: string;
  image_48: string;
  image_72: string;
  image_192: string;
  image_512: string;
  image_1024: string;
  status_text_canonical: string;
  team: string;
  is_custom_image: boolean;
}

export interface IUser {
  ok: boolean;
  error?: boolean;
  user: {
    id: string;
    team_id: string;
    name?: string;
    deleted?: boolean;
    color?: string;
    real_name?: string;
    tz?: string;
    tz_label?: string;
    tz_offset?: number;
    profile: IProfile;
    is_admin: boolean;
    is_owner: boolean;
    is_primary_owner: boolean;
    is_restricted: boolean;
    is_ultra_restricted: boolean;
    is_bot: boolean;
    is_app_user: boolean;
    updated: Date;
    has_2fa: boolean;
    two_factor_type?: string;
    enterprise_user: {};
  };
}

export interface IUserProfile {
  userId: string;
  name?: string;
  real_name: string;
  display_name: string;
  image: string;
  is_admin: boolean;
  is_owner: boolean;
}

export interface IUserResponse {
  success: boolean;
  id: string;
  real_name?: string;
  admin: boolean;
  updated: Date;
  team_id: string;
  display_name: string;
  avatar_original: string;
  avatar_512: string;
  avatar_72: string;
  first_name: string;
  last_name: string;
}
