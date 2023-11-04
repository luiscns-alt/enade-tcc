import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@services/api';
import { API_ENDPOINTS } from '../util/constants';

const TOKEN_KEY = '@RNAuth:token';
const USER_KEY = '@RNAuth:user';
export const USER_ID = '@RNAuth:userId';

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

interface AuthContextData {
  signed: boolean;
  user: string | null;
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
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function loadUserStorageData() {
    setLoading(true);

    const storedUser = await AsyncStorage.getItem(USER_KEY);
    const storedToken = await AsyncStorage.getItem(TOKEN_KEY);

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers['Authorization'] = `Bearer ${storedToken}`;
    }

    setLoading(false);
  }

  async function signIn(data: any) {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, data);
      const token = response.data.Authorization;
      setUser(token);
      const userId = response.data.data.id;
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(token));
      await AsyncStorage.setItem(TOKEN_KEY, token);
      await AsyncStorage.setItem(USER_ID, userId);
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
      const response = await api.post(API_ENDPOINTS.REGISTER, data);
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

  useEffect(() => {
    loadUserStorageData();
  }, []);

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
