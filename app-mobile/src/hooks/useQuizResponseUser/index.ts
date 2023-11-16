import { useEffect, useState } from 'react';
import { API_ENDPOINTS, INITIAL_QUIZ } from '../../util/constants';
import { CustomError } from '@src/@types/error';
import { QuizResponseUser } from '@src/@types';
import { api } from '@services/api';
import { useMe } from '@hooks/useMe';

const initialQuiz: QuizResponseUser[] = INITIAL_QUIZ;

export function useQuizResponseUser() {
  const { user } = useMe();
  const [loading, setLoading] = useState<boolean>(false);
  const [responseQuiz, setResponseQuiz] =
    useState<QuizResponseUser[]>(initialQuiz);
  const [error, setError] = useState<CustomError>(null);

  const fetchQuizResponse = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(
        API_ENDPOINTS.FETCH_QUIZ_RESPONSE_USER(user.id)
      );
      setResponseQuiz(data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizResponse();
  }, [user.id]);

  return {
    loading,
    responseQuiz,
    error,
    user,
    fetchQuizResponse,
  };
}
