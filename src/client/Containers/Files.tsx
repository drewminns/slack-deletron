import React from 'react';
import { connect } from 'react-redux';
import { fetchFilesList, deleteFileById, IInitialState } from '../store';
import { IFileItem, IPagingResponse, IChannelResponse, IIMResponse } from '../../shared/interfaces';

import { File } from '../Components/File';

interface IFilesProps {
  fetchFilesList: Function;
  deleteFileById: Function;
  files: IFileItem[];
  channel: {
    id: string;
    name: string;
    isChannel: boolean;
  };
  paging: IPagingResponse;
  loggedIn: boolean;
  currentChannel: IChannelResponse | IIMResponse | {};
}

class FilesComponent extends React.Component<IFilesProps> {
  _renderCurrentChannelDisplay = () => {
    if (!this.props.channel.isChannel) {
      return <h2>Private Message with {this.props.channel.name}</h2>;
    } else {
      return <h2>{this.props.channel.name}</h2>;
    }
  };

  render() {
    if (!this.props.loggedIn) {
      return <p>Not Logged In</p>;
    }

    let pagination;
    // if (this.props.files.length && this.props.next_cursor) {
    //   pagination = (
    //     <>
    //       <button onClick={() => this.props.fetchFilesList(this.props.next_cursor)}>Get Next</button>
    //     </>
    //   );
    // }
    return (
      <>
        {pagination}
        {this.props.files.length ? (
          <div>
            {this._renderCurrentChannelDisplay()}
            <p>
              {this.props.files.length} / Total: {this.props.paging.total}
            </p>
          </div>
        ) : (
          <div>
            <p>No Files </p>
          </div>
        )}

        <section className="clearfix">
          {this.props.files.map((file, i) => {
            return (
              <div key={i} className="float-left w-1/4 pb-10">
                <File
                  title={file.title}
                  type={file.type}
                  size={file.size}
                  id={file.id}
                  image={file.image}
                  created={file.created}
                  handleDelete={this.props.deleteFileById}
                />
              </div>
            );
          })}
        </section>
      </>
    );
  }
}

const mapStateToProps = ({
  files: { files, paging, channel },
  user: { loggedIn },
  channels: { currentChannel },
}: IInitialState) => {
  return { files, channel, loggedIn, paging, currentChannel };
};

export const Files = connect(
  mapStateToProps,
  { fetchFilesList, deleteFileById },
)(FilesComponent);
