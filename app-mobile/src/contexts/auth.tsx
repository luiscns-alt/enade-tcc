import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

const TOKEN_KEY = '@RNAuth:token';
const USER_KEY = '@RNAuth:user';

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token !== null) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  } catch (error) {
    console.error('Error getting token: ', error);
  }
};

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;

  signIn(data: any): Promise<void>;

  signOut(): Promise<void>;

  registerUser(data: any): Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // const { user, signIn, signOut, registerUser, loading } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem(USER_KEY);
      const storagedToken = await AsyncStorage.getItem(TOKEN_KEY);

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn(data: any) {
    try {
      const response = await api.post(`/auth/login`, data);
      const token = response.data.Authorization;
      setUser(token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(token));
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  async function registerUser(data: any) {
    try {
      const response = await api.post(`/user/register`, data);
      const token = response.data.Authorization;
      if (token) {
        setUser(token);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(token));
        await AsyncStorage.setItem(TOKEN_KEY, token);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  }

  async function listQuiz() {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    try {
      const response = await api.get(`/quiz`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.items;
    } catch (error) {
      console.error('Error fetching quiz list:', error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(user),
        user,
        loading,
        signIn,
        signOut,
        registerUser,
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
