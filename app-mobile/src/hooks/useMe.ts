import { api } from '@services/api';
import { useEffect, useState } from 'react';
import { CustomError } from '@src/@types/error';
import { UserData } from '@src/@types';
import { API_ENDPOINTS } from '../util/constants';

const initialUser: UserData = {
  id: '',
  login: '',
  password: '',
  name: '',
  surname: '',
  role: '',
  createdAt: '',
  updatedAt: '',
  gamificationId: null,
};
const useMe = () => {
  const [error, setError] = useState<CustomError>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserData>(initialUser);

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await api.get(API_ENDPOINTS.USER_ME);
      setUser(data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { user, error, loading };
};

export { useMe };
