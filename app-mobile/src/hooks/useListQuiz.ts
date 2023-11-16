import { useEffect, useState } from 'react';
import { api } from '@services/api';
import { QuizDTO } from '../@types';
import { CustomError } from '@src/@types/error';
import { API_ENDPOINTS } from '../util/constants';
import { useMe } from '@hooks/useMe';

export function useListQuiz() {
  const { user } = useMe();
  const [quizzes, setQuizzes] = useState<QuizDTO[]>([]);
  const [error, setError] = useState<CustomError>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData() {
    try {
      setLoading(true);
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

  return { quizzes, error, loading, user };
}
