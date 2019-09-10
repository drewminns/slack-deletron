import { Action, ActionTypes } from '../actions';
import { IFileItem } from '../../../shared/interfaces';

export interface IFilesState {
  files: IFileItem[];
  channel: string;
  user: string;
  next_cursor: string;
  count: number;
  fetchingFiles: boolean;
  fetchingFilesError: boolean;
  deletingFile: boolean;
  deletingFileError: boolean;
  deletingFileId: string;
}

const initialFileState: IFilesState = {
  files: [],
  channel: '',
  user: '',
  next_cursor: '',
  count: 0,
  fetchingFiles: false,
  fetchingFilesError: false,
  deletingFile: false,
  deletingFileError: false,
  deletingFileId: '',
};

export const fileReducer = (state: IFilesState = initialFileState, action: Action): IFilesState => {
  switch (action.type) {
    case ActionTypes.fetchFilesList:
      return { ...initialFileState, fetchingFiles: true };
    case ActionTypes.fetchChannelsError:
      return { ...initialFileState, fetchingFiles: false, fetchingFilesError: true };
    case ActionTypes.setFilesList:
      return {
        ...state,
        fetchingFiles: false,
        fetchingFilesError: false,
        files: action.payload.file_list,
        channel: action.payload.channel || '',
        user: action.payload.user || '',
        next_cursor: action.payload.next_cursor,
        count: action.payload.count,
      };
    default:
      return state;
  }
};
