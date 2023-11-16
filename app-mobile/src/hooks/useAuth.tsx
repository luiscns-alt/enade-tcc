import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@services/api';
import { API_ENDPOINTS } from '../util/constants';
import { LoginFormData } from '@screens/Login/SignIn';
import { RegisterFormData } from '@screens/Login/SignUp';

export const TOKEN_KEY = '@RNAuth:token';
const USER_KEY = '@RNAuth:user';
export const USER_ID = '@RNAuth:userId';

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

  useEffect(() => {
    async function loadStorageData() {
      const storedUser = await AsyncStorage.getItem(USER_KEY);
      const storedToken = await AsyncStorage.getItem(TOKEN_KEY);

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        api.defaults.headers['Authorization'] = `Bearer ${storedToken}`;
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn(formLogin: LoginFormData) {
    try {
      const { data } = await api.post(API_ENDPOINTS.LOGIN, formLogin);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.Authorization));
      await AsyncStorage.setItem(TOKEN_KEY, data.Authorization);
      await AsyncStorage.setItem(USER_ID, data.data.id);
      setUser(data.Authorization);
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  async function registerUser(formRegister: RegisterFormData) {
    try {
      const { data } = await api.post(API_ENDPOINTS.REGISTER, formRegister);
      const token = data.Authorization;
      if (token) {
        setUser(token);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(token));
        await AsyncStorage.setItem(TOKEN_KEY, token);
      }
    } catch (error) {
      console.error('Error during registration:', error);
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
