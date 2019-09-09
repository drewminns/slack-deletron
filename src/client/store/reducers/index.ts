import { combineReducers } from 'redux';
import { userReducer, IUserState } from './userReducer';

export interface IInitialState {
  user: IUserState;
}

export const reducers = combineReducers<IInitialState>({
  user: userReducer,
});
