import React from 'react';
import { connect } from 'react-redux';
import { fetchFilesList, deleteFileById, IInitialState } from '../store';
import { IFileItem } from '../../shared/interfaces';

interface IFilesProps {
  fetchFilesList: Function;
  deleteFileById: Function;
  files: IFileItem[];
  loggedIn: boolean;
  next_cursor: string;
}

class FilesComponent extends React.Component<IFilesProps> {
  render() {
    if (!this.props.loggedIn) {
      return <p>Not Logged In</p>;
    }

    let pagination;
    if (this.props.files.length && this.props.next_cursor) {
      pagination = (
        <>
          <button onClick={() => this.props.fetchFilesList(this.props.next_cursor)}>Get Next</button>
        </>
      );
    } else {
      pagination = <button onClick={() => this.props.fetchFilesList()}>Get Files</button>;
    }

    return (
      <>
        <h2>Files Component</h2>
        {pagination}
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

const mapStateToProps = ({ files: { files, next_cursor }, user: { loggedIn } }: IInitialState) => {
  return { files, loggedIn, next_cursor };
};

export const Files = connect(
  mapStateToProps,
  { fetchFilesList, deleteFileById },
)(FilesComponent);
