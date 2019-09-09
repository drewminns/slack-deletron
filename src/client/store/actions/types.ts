import {
  ILoginUserAction,
  ILogoutUserAction,
  IFetchUserProfileAction,
  IFetchUserProfileErrorAction,
  ISetUserProfileAction,
} from './user';
import { IFetchChannelsAction, IFetchChannelsErrorAction, ISetChannelsAction } from './channels';
import { IFetchFilesListAction, IFetchFilesListErrorAction, ISetFilesListAction } from './files';

export enum ActionTypes {
  loginUser,
  logoutUser,
  fetchUserProfile,
  setUserProfile,
  fetchUserProfileError,
  fetchChannels,
  fetchChannelsError,
  setChannels,
  fetchFilesList,
  fetchFilesListError,
  setFilesList,
}

export type Action =
  | ILoginUserAction
  | ILogoutUserAction
  | IFetchUserProfileAction
  | IFetchUserProfileErrorAction
  | ISetUserProfileAction
  | IFetchChannelsAction
  | IFetchChannelsErrorAction
  | ISetChannelsAction
  | IFetchFilesListAction
  | IFetchFilesListErrorAction
  | ISetFilesListAction;
