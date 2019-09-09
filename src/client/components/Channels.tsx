import React from 'react';
import { connect } from 'react-redux';
import { fetchChannels, IInitialState } from '../store';
import { IChannelResponse } from '../../shared/interfaces';

interface IChannelsProps {
  fetchChannels: Function;
  channels: IChannelResponse[];
  loggedIn: boolean;
}

class ChannelsComponent extends React.Component<IChannelsProps> {
  render() {
    if (!this.props.loggedIn) {
      return <p>Not Logged In</p>;
    }

    return (
      <>
        <h2>Channels Component</h2>
        <button onClick={() => this.props.fetchChannels()}>Get Channels</button>
        <ul>
          {this.props.channels.map((channel, i) => {
            return (
              <li key={i}>
                {channel.name} - {channel.id}
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

const mapStateToProps = ({ channels: { channels }, user: { loggedIn } }: IInitialState) => {
  return { channels, loggedIn };
};

export const Channels = connect(
  mapStateToProps,
  { fetchChannels },
)(ChannelsComponent);
