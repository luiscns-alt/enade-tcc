import { useEffect, useState } from 'react';
import { api } from '@services/api';
import { API_ENDPOINTS } from '../util/constants';
import { QuizDTO } from '../@types';
import { getToken } from '@hooks/useAuth';
import { CustomError } from '@src/@types/error';

export function useListQuiz() {
  const [quizzes, setQuizzes] = useState<QuizDTO[]>([]);
  const [error, setError] = useState<CustomError>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData() {
    setLoading(true);
    try {
      await getToken();
      const response = await api.get(API_ENDPOINTS.FETCH_ALL_QUESTIONS);

      const { data } = response.data;
      setQuizzes(data);
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

  return { quizzes, error, loading };
}
