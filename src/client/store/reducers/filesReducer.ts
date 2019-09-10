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
      return { ...state, fetchingFiles: true };
    case ActionTypes.fetchChannelsError:
      return {
        ...state,
        files: [],
        channel: initialFileState.channel,
        count: initialFileState.count,
        user: initialFileState.user,
        next_cursor: initialFileState.next_cursor,
        fetchingFiles: false,
        fetchingFilesError: true,
      };
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
    case ActionTypes.deleteFileById:
      return {
        ...state,
        deletingFile: true,
        deletingFileId: action.payload,
        deletingFileError: false,
      };
    case ActionTypes.deleteFileByIdError:
      return {
        ...state,
        deletingFile: false,
        deletingFileError: true,
      };
    case ActionTypes.deleteFileByIdSuccess:
      const files = state.files.filter(item => item.id !== action.payload.file_id);
      return {
        ...state,
        deletingFile: false,
        deletingFileError: false,
        files,
      };
    default:
      return state;
  }
};
