import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchFilesList, IInitialState } from '../store';
import { ChannelSelector, DateSelector, Button, FileTypeSelector } from '../Components';

export const Form: React.FC = () => {
  const dispatch = useDispatch();
  const { currentChannel, startDate, endDate, file_types } = useSelector(
    (state: IInitialState) => ({
      currentChannel: state.channels.currentChannel,
      startDate: state.form.startDate,
      endDate: state.form.endDate,
      file_types: state.form.file_types,
    }),
    shallowEqual,
  );

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    const id = currentChannel.id;

    let channelConfig = { isChannel: true, name: 'All Files' };
    if (currentChannel.is_im) {
      channelConfig = {
        isChannel: false,
        name: currentChannel.user_name || '',
      };
    } else if (currentChannel.is_channel) {
      channelConfig = {
        isChannel: true,
        name: currentChannel.name || '',
      };
    }

    dispatch(fetchFilesList(id, channelConfig, startDate, endDate, file_types));
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <ChannelSelector />
      <DateSelector />
      <FileTypeSelector />
      <button className="bg-teal-700 text-white hover:bg-teal-600 text-white-800 font-semibold py-2 px-4 rounded">
        Fetch Files
      </button>
    </form>
  );
};

Form.displayName = 'Form';
