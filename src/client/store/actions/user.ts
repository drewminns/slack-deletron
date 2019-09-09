import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { IUserReponse } from '../../../shared/interfaces';
import { getRequest } from './request';

export interface ILoginUserAction {
  type: ActionTypes.loginUser;
  payload: string;
}

export const loginUser = (token: string): ILoginUserAction => {
  const { protocol, host } = window.location;
  window.history.pushState({}, document.title, protocol + '//' + host);
  localStorage.setItem('sd-token', token);
  return {
    type: ActionTypes.loginUser,
    payload: token,
  };
};

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
  payload: IUserReponse;
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
