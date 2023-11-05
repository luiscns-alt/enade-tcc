import { useCallback, useEffect, useState } from 'react';
import { CustomError } from '@src/@types/error';
import { getToken } from '@hooks/useAuth';
import { api } from '@services/api';
import {
  API_ENDPOINTS,
  INITIAL_QUIZ_RESPONSE_USER,
} from '../../util/constants';
import { QuizResponseUser } from '@src/@types';

export function useQuizResponseByIdUser(id: string) {
  const [error, setError] = useState<CustomError>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [quizResponseByIdUser, setQuizResponseByIdUser] =
    useState<QuizResponseUser>(INITIAL_QUIZ_RESPONSE_USER);

  const fetchQuizResponseByIdUser = useCallback(async () => {
    try {
      setLoading(true);
      await getToken();
      const { data } = await api.get(
        API_ENDPOINTS.QUIZ_RESPONSE_BY_ID_USER(id)
      );
      setQuizResponseByIdUser(data.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchQuizResponseByIdUser();
  }, [id]);

  return {
    error,
    loading,
    quizResponseByIdUser,
  };
}
