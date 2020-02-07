import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { IInitialState } from '../store';

import { File } from '../Components/File';

export const Files: React.FC = () => {
  const { files, paging, isChannel, channelName } = useSelector(
    (state: IInitialState) => ({
      files: state.files.files,
      paging: state.files.paging,
      isChannel: state.channels.currentChannel.is_channel,
      channelName: state.files.channel.name,
    }),
    shallowEqual,
  );

  if (!files.length) {
    return <p>No Files</p>;
  }
  return (
    <div>
      <p>{channelName}</p>
      <p>
        {files.length} / Total: {paging.total}
      </p>
      <section className="flex flex-wrap overflow-y-auto h-screen items-start">
        {files.map(file => (
          <File
            key={file.id}
            title={file.title}
            type={file.type}
            size={file.size}
            id={file.id}
            image={file.image}
            created={file.created}
          />
        ))}
      </section>
    </div>
  );
};

Files.displayName = 'Files Wrapper';
