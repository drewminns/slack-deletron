import React from 'react';
import { connect } from 'react-redux';
import { fetchFilesList, IInitialState, changeChannelID } from '../store';
import { Channels } from '../Components';
import { IChannelResponse, IIMResponse } from '../../shared/interfaces';

import { Button } from '../Components';

interface IFormProps {
  channels: IChannelResponse[];
  ims: IIMResponse[];
  loggedIn: boolean;
  fetchingChannels: boolean;
  fetchFilesList: Function;
  changeChannelID: Function;
  currentChannel: IChannelResponse | IIMResponse | {};
}

class FormComponent extends React.Component<IFormProps> {
  _setChannel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.changeChannelID(e.target.value);
  };

  _fetchFiles = () => {
    const currentChannel = this.props.currentChannel;
    if (currentChannel.hasOwnProperty('id')) {
      if (currentChannel.hasOwnProperty('name')) {
        const channel = currentChannel as IChannelResponse;
        this.props.fetchFilesList((currentChannel as IChannelResponse).id, {
          isChannel: channel.is_channel,
          name: channel.name,
        });
      } else {
        const channel = currentChannel as IIMResponse;
        this.props.fetchFilesList((currentChannel as IIMResponse).id, {
          isChannel: !channel.is_im,
          name: channel.user_name,
        });
      }
    } else {
      this.props.fetchFilesList('', { isChannel: true, name: 'All Files' });
    }
  };

  render() {
    return (
      <>
        <h1>Form Component</h1>
        <Channels
          channels={this.props.channels}
          ims={this.props.ims}
          loggedIn={this.props.loggedIn}
          fetchingChannels={this.props.fetchingChannels}
          setChannel={this._setChannel}
          currentChannel={this.props.currentChannel}
        />
        <Button handleClick={this._fetchFiles} content="Get Files" />
      </>
    );
  }
}

const mapStateToProps = ({
  channels: { channels, ims, fetchingChannels, currentChannel },
  user: { loggedIn },
}: IInitialState) => {
  return { channels, ims, loggedIn, fetchingChannels, currentChannel };
};

export const Form = connect(
  mapStateToProps,
  { changeChannelID, fetchFilesList },
)(FormComponent);
