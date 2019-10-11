import React from 'react';
import { connect } from 'react-redux';
import { fetchFilesList, deleteFileById, IInitialState } from '../store';
import { IFileItem, IPagingResponse, IChannelResponse } from '../../shared/interfaces';

interface IFilesProps {
  fetchFilesList: Function;
  deleteFileById: Function;
  files: IFileItem[];
  paging: IPagingResponse;
  loggedIn: boolean;
  currentChannel: IChannelResponse | {};
}

class FilesComponent extends React.Component<IFilesProps> {
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
        <h2>Files Component</h2>
        {pagination}
        {this.props.files.length ? (
          <div>
            <h2>Results for {(this.props.currentChannel as IChannelResponse).name}</h2>
            <p>
              {this.props.files.length} / Total: {this.props.paging.total}
            </p>
          </div>
        ) : null}

        <ul>
          {this.props.files.map((file, i) => {
            return (
              <li key={i}>
                <p>
                  {file.title} - {file.id}
                </p>
                <p>{file.created}</p>
                <button onClick={() => this.props.deleteFileById(file.id)}>Delete File</button>
                <div>
                  <img src={file.image} alt={file.title} />
                </div>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

const mapStateToProps = ({
  files: { files, paging },
  user: { loggedIn },
  channels: { currentChannel },
}: IInitialState) => {
  return { files, loggedIn, paging, currentChannel };
};

export const Files = connect(
  mapStateToProps,
  { fetchFilesList, deleteFileById },
)(FilesComponent);
