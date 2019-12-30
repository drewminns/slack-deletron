import React from 'react';
import { connect } from 'react-redux';
import { fetchFilesList, fetchChannels, IInitialState, changeChannelID, changeDate, updateTypes } from '../store';
import { Channels, DateSelector, Button, FileTypeSelector } from '../Components';
import { IChannelResponse, IIMResponse } from '../../shared/interfaces';

interface IFormProps {
  channels: IChannelResponse[];
  ims: IIMResponse[];
  loggedIn: boolean;
  fetchingChannels: boolean;
  fetchChannels: Function;
  fetchFilesList: Function;
  changeChannelID: Function;
  changeDate: Function;
  updateTypes: Function;
  startDate: string;
  endDate: string;
  file_types: string[];
  currentChannel: IChannelResponse | IIMResponse | {};
}

class FormComponent extends React.Component<IFormProps> {
  _setChannel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.changeChannelID(e.target.value);
  };

  _setStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.changeDate(e.target.value, true);
  };

  _setEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.changeDate(e.target.value);
  };

  _setFileTypes = (type_value: string): void => {
    this.props.updateTypes(type_value, this.props.file_types);
  };

  _fetchFiles = () => {
    const currentChannel = this.props.currentChannel;
    let id = '';
    let channelConfig = { isChannel: true, name: 'All Files' };
    if (currentChannel.hasOwnProperty('id')) {
      if (currentChannel.hasOwnProperty('name')) {
        const channel = currentChannel as IChannelResponse;
        id = channel.id;
        channelConfig = {
          isChannel: channel.is_channel,
          name: channel.name,
        };
      } else {
        const channel = currentChannel as IIMResponse;
        id = channel.id;
        channelConfig = {
          isChannel: !channel.is_im,
          name: channel.user_name || '',
        };
      }
    }
    this.props.fetchFilesList(id, channelConfig, this.props.startDate, this.props.endDate, this.props.file_types);
  };

  componentDidUpdate(prevProps: { loggedIn: boolean }) {
    if (prevProps.loggedIn !== this.props.loggedIn) {
      this.props.fetchChannels();
    }
  }

  render() {
    if (!this.props.loggedIn) {
      return <p>Not Logged In</p>;
    }

    return (
      <>
        <Channels
          channels={this.props.channels}
          ims={this.props.ims}
          loggedIn={this.props.loggedIn}
          fetchingChannels={this.props.fetchingChannels}
          setChannel={this._setChannel}
          currentChannel={this.props.currentChannel}
        />
        <FileTypeSelector activeTypes={this.props.file_types} updateValue={this._setFileTypes} />
        <DateSelector
          endDate={this.props.endDate}
          startDate={this.props.startDate}
          handleEndDateChange={this._setEndDate}
          handleStartDateChange={this._setStartDate}
        />
        <Button handleClick={this._fetchFiles} content="Get Files" />
      </>
    );
  }
}

const mapStateToProps = ({
  channels: { channels, ims, fetchingChannels, currentChannel },
  user: { loggedIn },
  form: { startDate, endDate, file_types },
}: IInitialState) => {
  return { channels, ims, loggedIn, fetchingChannels, currentChannel, endDate, startDate, file_types };
};

export const Form = connect(
  mapStateToProps,
  { changeChannelID, fetchFilesList, changeDate, updateTypes, fetchChannels },
)(FormComponent);
