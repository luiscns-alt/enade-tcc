import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';
import { getToken } from '../contexts/auth';

const TOKEN_KEY = '@RNAuth:token';
const USER_KEY = '@RNAuth:user';

function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem(USER_KEY);
      const storagedToken = await AsyncStorage.getItem(TOKEN_KEY);

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        await getToken();
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async (data: any) => {
    setLoading(true);
    try {
      const response = await api.post(`/auth/login`, data);
      const token = response.data.Authorization;
      setUser(token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(token));
      await AsyncStorage.setItem(TOKEN_KEY, token);
      await getToken();
    } catch (error) {
      console.error('Error during sign in:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    await AsyncStorage.clear();
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
    setLoading(false);
  }, []);

  const registerUser = useCallback(async (data: any) => {
    setLoading(true);
    try {
      const response = await api.post(`/user/register`, data);
      const token = response.data.Authorization;
      if (token) {
        setUser(token);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(token));
        await AsyncStorage.setItem(TOKEN_KEY, token);
        await getToken();
      }
    } catch (error) {
      console.error('Error during registration:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, signIn, signOut, registerUser, loading };
}

export default useAuth;
