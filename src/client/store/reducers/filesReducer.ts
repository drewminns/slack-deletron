import { Action, ActionTypes } from '../actions';
import { IFilePayload } from '../../../shared/interfaces';

export interface IFilesState {
  files: IFilePayload[];
  fetchingFiles: boolean;
  fetchingFilesError: boolean;
  deletingFile: boolean;
  deletingFileError: boolean;
  deletingFileId: string;
}

const initialFileState: IFilesState = {
  files: [],
  fetchingFiles: false,
  fetchingFilesError: false,
  deletingFile: false,
  deletingFileError: false,
  deletingFileId: '',
};

export const fileReducer = (state: IFilesState = initialFileState, action: Action): IFilesState => {
  switch (action.type) {
    case ActionTypes.fetchFilesList:
      return { ...state, fetchingFiles: true };
    case ActionTypes.fetchChannelsError:
      return { ...state, fetchingFiles: false, fetchingFilesError: true };
    case ActionTypes.setFilesList:
      return { ...state, fetchingFiles: false, fetchingFilesError: false, files: action.payload };
    default:
      return state;
  }
};
