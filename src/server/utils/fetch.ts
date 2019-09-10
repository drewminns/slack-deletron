import axios, { AxiosPromise } from 'axios';
import { IJWT } from '../../shared/interfaces';

export function getData(endpoint: string, JWTtoken: IJWT, options?: {}): Promise<AxiosPromise> {
  const { token } = JWTtoken;
  return axios.get(`https://slack.com/api/${endpoint}`, {
    params: {
      token,
      ...options,
    },
  });
}

export function postData(endpoint: string, JWTtoken: IJWT, options?: {}): Promise<AxiosPromise> {
  const { token } = JWTtoken;
  return axios.post(`https://slack.com/api/${endpoint}`, {
    params: {
      token,
      ...options,
    },
  });
}
