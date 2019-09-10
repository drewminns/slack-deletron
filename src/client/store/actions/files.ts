import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { getRequest, getRequestParam } from './request';
import { IFilePayload, IFileDeletePayload } from '../../../shared/interfaces';

export interface IFetchFilesListAction {
  type: ActionTypes.fetchFilesList;
}

export interface IFetchFilesListErrorAction {
  type: ActionTypes.fetchFilesListError;
}

export interface ISetFilesListAction {
  type: ActionTypes.setFilesList;
  payload: IFilePayload;
}

export const fetchFilesList = () => {
  return async (dispatch: Dispatch) => {
    dispatch<IFetchFilesListAction>({ type: ActionTypes.fetchFilesList });

    try {
      const response = await getRequest('api/files');

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

      if (!response.data.ok) {
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
