import React from 'react';
import { IChannelResponse, IIMResponse } from '../../shared/interfaces';

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

const renderChannelList = (
  channels: IChannelResponse[],
  ims: IIMResponse[],
  setChannel: Function,
  activeChannel: string,
) => {
  const channelList: { text: string; id: string }[] = channels.map(channel => ({
    id: channel.id,
    text: `${channel.name} - Members: ${channel.num_members}`,
  }));

  const imList: { text: string; id: string }[] = ims.map(im => ({
    id: im.id,
    text: `${im.user_name}`,
  }));

  // const displayedResults: { text: string; id: string }[] = [...channelList, ...imList];
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
        {channelList.length && renderOptGroup(channelList, 'Channels')}
        {imList.length && renderOptGroup(imList, 'Private Messages')}
      </select>
    </>
  );
};

export const Channels: React.SFC<IChannelsProps> = ({
  loggedIn,
  fetchingChannels,
  channels,
  ims,
  setChannel,
  currentChannel,
}: IChannelsProps) => {
  if (!loggedIn) {
    return <p>Not Logged In</p>;
  }

  const activeChannel = (currentChannel.hasOwnProperty('id') && (currentChannel as IChannelResponse).id) || '';
  return <>{fetchingChannels ? <p>Loading</p> : renderChannelList(channels, ims, setChannel, activeChannel)}</>;
};

Channels.displayName = 'Channels Select';
