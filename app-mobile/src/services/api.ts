import axios, { AxiosRequestConfig } from 'axios';

interface MyAxiosRequestConfig extends AxiosRequestConfig {
  headers: {
    Authorization?: string;
    [key: string]: any;
  };
}

const api = axios.create({
  baseURL: 'http://10.0.0.181:3000'
});

export { api };
