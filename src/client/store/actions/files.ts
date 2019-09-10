import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { getRequest } from './request';
import { IFilePayload } from '../../../shared/interfaces';

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
