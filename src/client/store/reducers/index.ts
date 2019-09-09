import { combineReducers } from 'redux';
import { userReducer, IUserState } from './userReducer';
import { channelReducer, IChannelState } from './channelReducer';
import { fileReducer, IFilesState } from './filesReducer';

export interface IInitialState {
  user: IUserState;
  channels: IChannelState;
  files: IFilesState;
}

export const reducers = combineReducers<IInitialState>({
  user: userReducer,
  channels: channelReducer,
  files: fileReducer,
});
