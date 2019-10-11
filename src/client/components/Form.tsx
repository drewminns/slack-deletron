import React from 'react';
import { connect } from 'react-redux';
import { fetchFilesList, IInitialState, changeChannelID } from '../store';
import { Channels } from './Channels';
import { IChannelResponse } from '../../shared/interfaces';

interface IFormProps {
  channels: IChannelResponse[];
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
    console.log('rendered');
    return (
      <>
        <h1>Form Component</h1>
        <Channels
          channels={this.props.channels}
          loggedIn={this.props.loggedIn}
          fetchingChannels={this.props.fetchingChannels}
          setChannel={this._setChannel}
          currentChannel={this.props.currentChannel}
        />
        <button onClick={this._fetchFiles}>Get Files</button>
      </>
    );
  }
}

const mapStateToProps = ({
  channels: { channels, fetchingChannels, currentChannel },
  user: { loggedIn },
}: IInitialState) => {
  return { channels, loggedIn, fetchingChannels, currentChannel };
};

export const Form = connect(
  mapStateToProps,
  { changeChannelID, fetchFilesList },
)(FormComponent);
