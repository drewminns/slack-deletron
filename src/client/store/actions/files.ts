import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { getRequest, getRequestParam } from './request';
import { IFilePayload, IFileDeletePayload } from '../../../shared/interfaces';

export interface IFetchFilesListAction {
  type: ActionTypes.fetchFilesList;
  payload: {
    id: string;
    details: {
      id: string;
      name: string;
      isChannel: boolean;
    };
  };
}

export interface IFetchFilesListErrorAction {
  type: ActionTypes.fetchFilesListError;
}

export interface ISetFilesListAction {
  type: ActionTypes.setFilesList;
  payload: IFilePayload;
}

export const fetchFilesList = (
  channelId: string,
  channelDetails: { isChannel: boolean; name: string },
  startDate: string,
  endDate: string,
  fileTypes: string[],
  next_cursor?: string,
) => {
  return async (dispatch: Dispatch) => {
    dispatch<IFetchFilesListAction>({
      type: ActionTypes.fetchFilesList,
      payload: {
        id: channelId,
        details: {
          id: channelId,
          name: channelDetails.name || 'All Files',
          isChannel: channelDetails.isChannel || true,
        },
      },
    });

    const options = {
      startDate,
      endDate,
      types: fileTypes.join(','),
    };
    try {
      let response;
      if (next_cursor) {
        response = await getRequest('api/files', {
          ...options,
          next_cursor,
          channel: channelId,
        });
      } else {
        if (channelId) {
          response = await getRequest('api/files', {
            ...options,
            channel: channelId,
          });
        } else {
          response = await getRequest('api/files', options);
        }
      }

      dispatch<ISetFilesListAction>({
        type: ActionTypes.setFilesList,
        payload: response.data,
      });
    } catch (e) {
      dispatch<IFetchFilesListErrorAction>({
        type: ActionTypes.fetchFilesListError,
      });
    }
  };
};

export interface IDeleteFileByIdAction {
  type: ActionTypes.deleteFileById;
  payload: string;
}

export interface IDeleteFileByIdErrorAction {
  type: ActionTypes.deleteFileByIdError;
}

export interface IDeleteFileByIdSuccessAction {
  type: ActionTypes.deleteFileByIdSuccess;
  payload: IFileDeletePayload;
}

export const deleteFileById = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch<IDeleteFileByIdAction>({ type: ActionTypes.deleteFileById, payload: id });

    try {
      const response = await getRequestParam('api/files/delete', id);

      if (!response.data.success) {
        dispatch<IDeleteFileByIdErrorAction>({
          type: ActionTypes.deleteFileByIdError,
        });
      }

      dispatch<IDeleteFileByIdSuccessAction>({
        type: ActionTypes.deleteFileByIdSuccess,
        payload: response.data,
      });
    } catch (err) {
      dispatch<IDeleteFileByIdErrorAction>({
        type: ActionTypes.deleteFileByIdError,
      });
    }
  };
};
