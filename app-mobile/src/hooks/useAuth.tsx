import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@services/api';
import { API_ENDPOINTS } from '../util/constants';
import { LoginFormData } from '@screens/Login/SignIn';
import { RegisterFormData } from '@screens/Login/SignUp';
import Toast from 'react-native-toast-message';
import { ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();

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
      console.error('Error during sign in:', error.response);
      const statusCode = error.response.status;
      switch (statusCode) {
        case 401:
          Toast.show({
            type: 'error',
            text1: 'Acesso negado: credenciais inválidas.',
          });
          break;
        case 403:
          Toast.show({
            type: 'error',
            text1:
              'Acesso negado: você não tem permissão para realizar esta ação.',
          });
          break;
        case 500:
          Toast.show({
            type: 'error',
            text1: 'Erro do servidor: tente novamente mais tarde.',
          });
          break;
        default:
          Toast.show({
            type: 'error',
            text1: 'Ocorreu um erro: tente novamente mais tarde.',
          });
      }
    }
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  async function registerUser(formRegister: RegisterFormData) {
    try {
      const { status } = await api.post(API_ENDPOINTS.REGISTER, formRegister);
      if (status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Conta criada com sucesso! ',
          text2: 'Por favor, faça o login para continuar.',
        });
        navigation.navigate('SignIn');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      const statusCode = error.response;
      if (error.response.data.status === 409) {
        Toast.show({
          type: 'info',
          text1: 'O e-mail fornecido já está cadastrado no sistema.',
          text2:
            'Por favor, utilize outro e-mail ou faça login com o e-mail existente.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Ocorreu um erro: tente novamente mais tarde.',
        });
      }
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
