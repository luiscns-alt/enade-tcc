import axios, { AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_KEY } from '@hooks/useAuth';
const apiUrl = 'https://api-enade-nestjs-prisma-production.up.railway.app';
// const apiUrl = 'http://10.0.0.181:3000';

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };
