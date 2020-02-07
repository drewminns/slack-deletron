import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { IChannelResponse, IIMResponse } from '../../shared/interfaces';
import { IInitialState, fetchChannels, changeChannelID } from '../store';

interface IChannelsProps {
  channels: IChannelResponse[];
  ims: IIMResponse[];
  loggedIn: boolean;
  fetchingChannels: boolean;
  setChannel: Function;
  currentChannel: IChannelResponse | {};
}

function renderOptGroup(displayGroup: { text: string; id: string }[], title: string) {
  return (
    <optgroup label={title}>
      {displayGroup.map((item, key) => (
        <option key={key} value={item.id}>
          {item.text}
        </option>
      ))}
    </optgroup>
  );
}

const renderChannelList = (channels: IChannelResponse[], ims: IIMResponse[], activeChannel: string) => {
  const dispatch = useDispatch();
  const channelList: { text: string; id: string }[] = channels.map(channel => ({
    id: channel.id,
    text: `${channel.name} - Members: ${channel.num_members}`,
  }));

  const imList: { text: string; id: string }[] = ims.map(im => ({
    id: im.id,
    text: `${im.user_name}`,
  }));

  function handleChannelChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const { value } = event.target;
    dispatch(changeChannelID(value));
  }

  return (
    <>
      <label htmlFor="channel-select">Channel</label>
      <select
        id="channel-select"
        value={activeChannel}
        onChange={handleChannelChange}
        className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        <option value="">All Files</option>
        {channelList.length && renderOptGroup(channelList, 'Channels')}
        {imList.length && renderOptGroup(imList, 'Private Messages')}
      </select>
    </>
  );
};

export const ChannelSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { fetchingChannels, channels, ims, currentChannel } = useSelector(
    (state: IInitialState) => ({
      fetchingChannels: state.channels.fetchingChannels,
      channels: state.channels.channels,
      ims: state.channels.ims,
      currentChannel: state.channels.currentChannel,
    }),
    shallowEqual,
  );
  const activeChannel = (currentChannel.hasOwnProperty('id') && (currentChannel as IChannelResponse).id) || '';

  useEffect(() => {
    if (channels.length === 0 && ims.length === 0) {
      dispatch(fetchChannels());
    }
  }, [channels, ims]);
  return <div>{fetchingChannels ? <p>Loading</p> : renderChannelList(channels, ims, activeChannel)}</div>;
};

ChannelSelector.displayName = 'Channel Selector';
