import { Action, ActionTypes } from '../actions';
import { IChannelResponse } from '../../../shared/interfaces';

export interface IChannelState {
  channels: IChannelResponse[];
  fetchingChannels: boolean;
  fetchChannelsError: boolean;
}

const initialChannelState: IChannelState = {
  channels: [],
  fetchingChannels: false,
  fetchChannelsError: false,
};

export const channelReducer = (state: IChannelState = initialChannelState, action: Action): IChannelState => {
  switch (action.type) {
    case ActionTypes.fetchChannels:
      return { ...state, fetchingChannels: true };
    case ActionTypes.fetchChannelsError:
      return { ...state, fetchingChannels: false, fetchChannelsError: true };
    case ActionTypes.setChannels:
      return { ...state, fetchingChannels: false, fetchChannelsError: false, channels: action.payload };
    default:
      return state;
  }
};
