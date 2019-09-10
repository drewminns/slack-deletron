import {
  ILoginUserAction,
  ILogoutUserAction,
  IFetchUserProfileAction,
  IFetchUserProfileErrorAction,
  ISetUserProfileAction,
} from './user';
import { IFetchChannelsAction, IFetchChannelsErrorAction, ISetChannelsAction } from './channels';
import {
  IFetchFilesListAction,
  IFetchFilesListErrorAction,
  ISetFilesListAction,
  IDeleteFileByIdAction,
  IDeleteFileByIdErrorAction,
  IDeleteFileByIdSuccessAction,
} from './files';

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
  deleteFileById,
  deleteFileByIdSuccess,
  deleteFileByIdError,
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
  | ISetFilesListAction
  | IDeleteFileByIdAction
  | IDeleteFileByIdErrorAction
  | IDeleteFileByIdSuccessAction;
