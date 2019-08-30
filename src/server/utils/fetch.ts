import axios, { AxiosPromise } from 'axios';

export function getData(endpoint: string, token: string, user: string, options?: {}): Promise<AxiosPromise> {
  return axios.get(`https://slack.com/api/${endpoint}`, {
    params: {
      token,
      user,
      ...options,
    },
  });
}

export function postData(endpoint: string, token: string, user: string, options?: {}): Promise<AxiosPromise> {
  return axios.post(`https://slack.com/api/${endpoint}`, {
    params: {
      token,
      user,
      ...options,
    },
  });
}
