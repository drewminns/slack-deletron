import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { IUserResponse } from '../../../shared/interfaces';
import { getRequest, getAuthRequest } from './request';
import { fetchChannels } from './channels';

export interface ILoginUserAction {
  type: ActionTypes.loginUser;
  payload: string;
}

export const loginUser = (token: string) => {
  return async (dispatch: Dispatch) => {
    dispatch<IFetchUserProfileAction>({ type: ActionTypes.fetchUserProfile });
    try {
      const response = await getAuthRequest('api/user/profile', token);
      if (response.data.success) {
        const { protocol, host } = window.location;
        window.history.pushState({}, document.title, protocol + '//' + host);
        localStorage.setItem('sd-token', token);
        dispatch<ILoginUserAction>({
          type: ActionTypes.loginUser,
          payload: token,
        });
        dispatch<ISetUserProfileAction>({
          type: ActionTypes.setUserProfile,
          payload: response.data,
        });
      } else {
        localStorage.removeItem('sd-token');
      }
    } catch (err) {
      localStorage.removeItem('sd-token');

      dispatch<ILogoutUserAction>({ type: ActionTypes.logoutUser });
      dispatch<IFetchUserProfileErrorAction>({
        type: ActionTypes.fetchUserProfileError,
      });
    }
  };
};

// export const loginUser = (token: string): ILoginUserAction => {

//   return {
//     type: ActionTypes.loginUser,
//     payload: token,
//   };
// };

export interface ILogoutUserAction {
  type: ActionTypes.logoutUser;
}

export const logoutUser = (): ILogoutUserAction => {
  localStorage.removeItem('sd-token');
  return {
    type: ActionTypes.logoutUser,
  };
};

export interface IFetchUserProfileAction {
  type: ActionTypes.fetchUserProfile;
}

export interface IFetchUserProfileErrorAction {
  type: ActionTypes.fetchUserProfileError;
}

export interface ISetUserProfileAction {
  type: ActionTypes.setUserProfile;
  payload: IUserResponse;
}

export const fetchUserProfile = () => {
  return async (dispatch: Dispatch) => {
    dispatch<IFetchUserProfileAction>({ type: ActionTypes.fetchUserProfile });
    try {
      const response = await getRequest('api/user/profile');

      dispatch<ISetUserProfileAction>({
        type: ActionTypes.setUserProfile,
        payload: response.data,
      });
    } catch (e) {
      dispatch<IFetchUserProfileErrorAction>({
        type: ActionTypes.fetchUserProfileError,
      });
    }
  };
};
