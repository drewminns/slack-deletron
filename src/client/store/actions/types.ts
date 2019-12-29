import {
  ILoginUserAction,
  ILogoutUserAction,
  IFetchUserProfileAction,
  IFetchUserProfileErrorAction,
  ISetUserProfileAction,
} from './user';
import {
  IFetchChannelsAction,
  IFetchChannelsErrorAction,
  ISetChannelsAction,
  ISetCurrentChannelAction,
} from './channels';
import {
  IFetchFilesListAction,
  IFetchFilesListErrorAction,
  ISetFilesListAction,
  IDeleteFileByIdAction,
  IDeleteFileByIdErrorAction,
  IDeleteFileByIdSuccessAction,
} from './files';
import { ISetDate, IUpdateType } from './form';

export enum ActionTypes {
  loginUser = '@@user ::: LOGIN_USER',
  logoutUser = '@@user ::: LOGOUT_USER',
  fetchUserProfile = '@@user ::: FETCH_USER_PROFILE',
  setUserProfile = '@@user ::: SET_USER_PROFILE',
  fetchUserProfileError = '@@user ::: FETCH_USER_PROFILE_ERROR',
  fetchChannels = '@@channels ::: FETCH_CHANNELS',
  fetchChannelsError = '@@channels ::: FETCH_CHANNELS_ERROR',
  setChannels = '@@channels ::: SET_CHANNELS',
  setCurrentChannelByID = '@@channels ::: CHANGE_CHANNEL',
  fetchFilesList = '@@files ::: FETCH_FILES_LIST',
  fetchFilesListError = '@@files ::: FETCH_FILES_LIST_ERROR',
  setFilesList = '@@files ::: SET_FILES_LIST',
  deleteFileById = '@@files ::: DELETE_FILE_BY_ID',
  deleteFileByIdSuccess = '@@files ::: DELETE_FILE_BY_ID_SUCCESS',
  deleteFileByIdError = '@@files ::: DELETE_FILE_BY_ID_ERROR',
  setStartDate = '@@form ::: SET_START_DATE',
  setEndDate = '@@form ::: SET_END_DATE',
  updateTypes = '@@form ::: UPDATE_TYPES',
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
  | ISetCurrentChannelAction
  | ISetDate
  | IUpdateType
  | IFetchFilesListAction
  | IFetchFilesListErrorAction
  | ISetFilesListAction
  | IDeleteFileByIdAction
  | IDeleteFileByIdErrorAction
  | IDeleteFileByIdSuccessAction;
