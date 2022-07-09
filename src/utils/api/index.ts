import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';

axios.defaults.baseURL = 'https://cryptocurrency-rate-backend.herokuapp.com';

axios.defaults.timeout = 10000;

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

axios.defaults.transformRequest = (data) => qs.stringify(data);

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  (error: AxiosError) => {
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 401:
          localStorage.removeItem('token');
          break;
      }
    } else {
      if (!window.navigator.onLine) {
        return;
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
