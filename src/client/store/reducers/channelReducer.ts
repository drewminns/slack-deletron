import { Action, ActionTypes } from '../actions';
import { IChannelResponse, IIMResponse } from '../../../shared/interfaces';

export interface IChannelState {
  channels: IChannelResponse[];
  ims: IIMResponse[];
  fetchingChannels: boolean;
  fetchChannelsError: boolean;
  currentChannel: {};
}

const initialChannelState: IChannelState = {
  channels: [],
  ims: [],
  fetchingChannels: false,
  fetchChannelsError: false,
  currentChannel: {},
};

export const channelReducer = (state: IChannelState = initialChannelState, action: Action): IChannelState => {
  switch (action.type) {
    case ActionTypes.fetchChannels:
      return { ...state, fetchingChannels: true };
    case ActionTypes.fetchChannelsError:
      return { ...state, fetchingChannels: false, fetchChannelsError: true };
    case ActionTypes.setChannels:
      return {
        ...state,
        fetchingChannels: false,
        fetchChannelsError: false,
        channels: action.payload.channels,
        ims: action.payload.ims,
      };
    case ActionTypes.setCurrentChannelByID:
      const channel =
        state.channels.find(chnl => chnl.id === action.payload) || state.ims.find(im => im.id === action.payload) || {};
      return { ...state, currentChannel: channel };
    default:
      return state;
  }
};
