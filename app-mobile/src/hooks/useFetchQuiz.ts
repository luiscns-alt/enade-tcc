import { API_ENDPOINTS } from '../util/constants';
import { CustomError } from '@src/@types/error';
import { QuizData } from '@src/@types';
import { api } from '@services/api';
import { getToken } from '@hooks/useAuth';
import { useCallback, useState } from 'react';

const initialQuizData: QuizData = {
  id: '',
  title: '',
  description: '',
  published: false,
  createdAt: '',
  updatedAt: '',
  userId: null,
  categoryId: '',
  question: [],
};

export function useFetchQuiz(quizId: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuizData>(initialQuizData);
  const [error, setError] = useState<CustomError>(null);

  const fetchQuiz = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getToken();

      const { data } = await api.get(API_ENDPOINTS.FETCH_QUIZ_BY_ID(quizId));

      setQuestions(data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  return {
    loading,
    questions,
    error,
    fetchQuiz,
  };
}
