import axios, {AxiosError, AxiosResponse, AxiosInstance, AxiosRequestConfig} from 'axios';
import { getToken } from './token';

const BASE_URL = 'https://8.react.pages.academy/six-cities';
const TIMEOUT = 5000;

export const createAPI = (onUnauthorized: () => void):AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
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
