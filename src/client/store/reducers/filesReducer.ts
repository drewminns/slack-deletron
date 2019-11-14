import { Action, ActionTypes } from '../actions';
import { IFileItem, IPagingResponse } from '../../../shared/interfaces';

export interface IFilesState {
  files: IFileItem[];
  channel: string;
  user: string;
  paging: IPagingResponse;
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
  paging: {
    total: 0,
  },
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
        user: initialFileState.user,
        paging: initialFileState.paging,
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
        paging: action.payload.paging,
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
        paging: {
          ...state.paging,
          total: state.paging.total - 1,
        },
      };
    default:
      return state;
  }
};
