import React from 'react';
import { connect } from 'react-redux';
import { fetchFilesList, deleteFileById, IInitialState } from '../store';
import { IFileItem } from '../../shared/interfaces';

interface IChannelsProps {
  fetchFilesList: Function;
  deleteFileById: Function;
  files: IFileItem[];
  loggedIn: boolean;
}

class FilesComponent extends React.Component<IChannelsProps> {
  render() {
    if (!this.props.loggedIn) {
      return <p>Not Logged In</p>;
    }

    return (
      <>
        <h2>Files Component</h2>
        <button onClick={() => this.props.fetchFilesList()}>Get Files</button>
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

const mapStateToProps = ({ files: { files }, user: { loggedIn } }: IInitialState) => {
  return { files, loggedIn };
};

export const Files = connect(
  mapStateToProps,
  { fetchFilesList, deleteFileById },
)(FilesComponent);
