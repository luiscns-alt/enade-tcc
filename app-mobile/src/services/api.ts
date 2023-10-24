import axios, { AxiosRequestConfig } from 'axios';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
interface MyAxiosRequestConfig extends AxiosRequestConfig {
  headers: {
    Authorization?: string;
    [key: string]: any;
  };
}

const api = axios.create({
  baseURL: apiUrl,
});

export { api };
