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
  currentChannel: IChannelResponse | object;
}

class FormComponent extends React.Component<IFormProps> {
  _setChannel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.changeChannelID(e.target.value);
  };

  _fetchFiles = () => {
    if (this.props.currentChannel.hasOwnProperty('id')) {
      this.props.fetchFilesList((this.props.currentChannel as IChannelResponse).id);
    } else {
      this.props.fetchFilesList();
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
