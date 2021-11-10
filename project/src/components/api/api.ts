import axios, {AxiosError, AxiosResponse, AxiosInstance, AxiosRequestConfig} from 'axios';
import { getToken } from './token';

const baseURL = 'https://8.react.pages.academy/six-cities';
const timeout = 5000;

export const createAPI = (onUnauthorized: () => void):AxiosInstance => {
  const api = axios.create({
    baseURL: baseURL,
    timeout: timeout,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const {response} = error;

      if (response?.status === 401) {
        onUnauthorized();
      }

      return Promise.reject(error);
    },
  );

  api.interceptors.request.use(
    (config:AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return api;
};
