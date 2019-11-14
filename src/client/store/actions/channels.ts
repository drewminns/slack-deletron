import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { IChannelResponse } from '../../../shared/interfaces';
import { getRequest } from './request';

export interface IFetchChannelsAction {
  type: ActionTypes.fetchChannels;
}

export interface IFetchChannelsErrorAction {
  type: ActionTypes.fetchChannelsError;
}

export interface ISetChannelsAction {
  type: ActionTypes.setChannels;
  payload: IChannelResponse[];
}

export const fetchChannels = () => {
  return async (dispatch: Dispatch) => {
    dispatch<IFetchChannelsAction>({ type: ActionTypes.fetchChannels });

    try {
      const response = await getRequest('api/user/channels');

      dispatch<ISetChannelsAction>({
        type: ActionTypes.setChannels,
        payload: response.data,
      });
    } catch (e) {
      dispatch<IFetchChannelsErrorAction>({
        type: ActionTypes.fetchChannelsError,
      });
    }
  };
};

export interface ISetCurrentChannelAction {
  type: ActionTypes.setCurrentChannelByID;
  payload: string;
}

export const changeChannelID = (channelId: string): ISetCurrentChannelAction => {
  return {
    type: ActionTypes.setCurrentChannelByID,
    payload: channelId,
  };
};
