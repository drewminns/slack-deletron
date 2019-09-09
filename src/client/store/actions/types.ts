import {
  ILoginUserAction,
  ILogoutUserAction,
  IFetchUserProfileAction,
  IFetchUserProfileErrorAction,
  ISetUserProfileAction,
} from './user';

export enum ActionTypes {
  loginUser,
  logoutUser,
  fetchUserProfile,
  setUserProfile,
  fetchUserProfileError,
}

export type Action =
  | ILoginUserAction
  | ILogoutUserAction
  | IFetchUserProfileAction
  | IFetchUserProfileErrorAction
  | ISetUserProfileAction;
