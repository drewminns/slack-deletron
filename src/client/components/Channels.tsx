import React from 'react';
import { IChannelResponse } from '../../shared/interfaces';

interface IChannelsProps {
  channels: IChannelResponse[];
  loggedIn: boolean;
  fetchingChannels: boolean;
  setChannel: Function;
  currentChannel: IChannelResponse | {};
}

const renderChannelList = (list: IChannelResponse[], setChannel: Function, activeChannel: string) => {
  return (
    <>
      <label htmlFor="channel-select">Channel</label>
      <select
        id="channel-select"
        value={activeChannel}
        onChange={e => setChannel(e)}
        className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        <option value="">All Files</option>
        {list.map((channel, i) => {
          return (
            <option key={i} value={channel.id}>
              {channel.name} - Members: {channel.num_members}
            </option>
          );
        })}
      </select>
    </>
  );
};

export const Channels: React.SFC<IChannelsProps> = ({
  loggedIn,
  fetchingChannels,
  channels,
  setChannel,
  currentChannel,
}: IChannelsProps) => {
  if (!loggedIn) {
    return <p>Not Logged In</p>;
  }

  const activeChannel = (currentChannel.hasOwnProperty('id') && (currentChannel as IChannelResponse).id) || '';
  return <>{fetchingChannels ? <p>Loading</p> : renderChannelList(channels, setChannel, activeChannel)}</>;
};

Channels.displayName = 'Channels Select';
