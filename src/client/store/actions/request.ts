import axios, { AxiosPromise } from 'axios';
import { store } from '../../index';
import { IInitialState } from '../reducers';

export const getRequest = (url: string, query?: {}): Promise<AxiosPromise> => {
  const storeData = store.getState() as IInitialState;
  return axios.get(url, { headers: { Authorization: 'Bearer ' + storeData.user.token }, params: query });
};

export const postRequest = (url: string): Promise<AxiosPromise> => {
  const storeData = store.getState() as IInitialState;
  return axios.post(url, { headers: { Authorization: 'Bearer ' + storeData.user.token } });
};

export const getRequestParam = (url: string, param: string): Promise<AxiosPromise> => {
  const storeData = store.getState() as IInitialState;
  return axios.get(url + `/${param}`, { headers: { Authorization: 'Bearer ' + storeData.user.token } });
};
