import { Action, ActionTypes } from '../actions';
import { IUserResponse } from '../../../shared/interfaces';

export interface IUserState {
  loggedIn: boolean;
  profile: IUserResponse;
  token: string;
  fetchingProfile: boolean;
  fetchProfileError: boolean;
}

const initialUserState: IUserState = {
  loggedIn: false,
  profile: {
    success: false,
    id: '',
    real_name: '',
    admin: false,
    updated: new Date(),
    team_id: '',
    display_name: '',
    avatar_original: '',
    avatar_512: '',
    avatar_72: '',
    first_name: '',
    last_name: '',
  },
  token: '',
  fetchingProfile: false,
  fetchProfileError: false,
};

export const userReducer = (state: IUserState = initialUserState, action: Action): IUserState => {
  switch (action.type) {
    case ActionTypes.loginUser:
      return { ...state, loggedIn: true, token: action.payload };
    case ActionTypes.logoutUser:
      return { ...state, loggedIn: false, token: initialUserState.token };
    case ActionTypes.fetchUserProfile:
      return { ...state, fetchingProfile: true };
    case ActionTypes.setUserProfile:
      return { ...state, profile: action.payload, fetchProfileError: false };
    case ActionTypes.fetchUserProfileError:
      return { ...state, fetchingProfile: false, fetchProfileError: true };
    default:
      return state;
  }
};
