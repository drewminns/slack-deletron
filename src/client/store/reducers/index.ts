import { combineReducers } from 'redux';
import { userReducer, IUserState } from './userReducer';
import { channelReducer, IChannelState } from './channelReducer';
import { fileReducer, IFilesState } from './filesReducer';
import { formReducer, IFormState } from './formReducer';

export interface IInitialState {
  user: IUserState;
  channels: IChannelState;
  files: IFilesState;
  form: IFormState;
}

export const reducers = combineReducers<IInitialState>({
  user: userReducer,
  channels: channelReducer,
  files: fileReducer,
  form: formReducer,
});
