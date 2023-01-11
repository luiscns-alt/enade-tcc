import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as auth from '../services/auth';
import axios from 'axios';
// import { api } from '../services/api';
// import { api } from '../services/api';
// import { api } from '../services/api';
// import api from '../services/api';

export const TOKEN_KEY = '@RNAuth:token';
export const isAuthenticated = () => AsyncStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => AsyncStorage.getItem(TOKEN_KEY);
export const api = axios.create({
  baseURL: 'http://10.0.2.8:3005',
});

// api.interceptors.request.use(async (config) => {
//     const token = getToken();
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(params: any): Promise<void>;
  signOut(): void;
  registerUser(params: any): Promise<void>;
  listQuiz(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
      }

      setLoading(false);
    }

    loadStorageData();
  });

  async function signIn(data: any) {
    try {
      const response = await api
        .post(`/auth/login`, data)
        .then((res) => {
          const token = res.data.access_token;

          setUser(token);

          AsyncStorage.setItem('@RNAuth:user', JSON.stringify(token));
          AsyncStorage.setItem(TOKEN_KEY, token);
        })
        .catch((error) => console.log(error));
        console.log(response);
    } catch (error) {
      return error;
    }
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  async function registerUser(params: any) {
    try {
      const response = await api
        .post(`/user/register`, params)
        .then((res) => {
          if (res && res.data && res.data.access_token) {
            const token = res.data.access_token;

            setUser(token);

            AsyncStorage.setItem('@RNAuth:user', JSON.stringify(token));
            AsyncStorage.setItem(TOKEN_KEY, token);
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      return error;
    }
  }

  async function listQuiz() {
    const token = await getToken();
    try {
      await api
        .get(`/quiz`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data = res.data.items;
          return data;
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signOut,
        registerUser,
        listQuiz,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export { AuthProvider, useAuth };
