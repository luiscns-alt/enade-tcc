import { useEffect, useState } from 'react';
import { getToken } from '../contexts/auth';
import { api } from '../services/api';
import { API_ENDPOINTS } from '../util/constants';

type Quiz = {
  id: string;
  title: string;
  description: string;
  published: boolean;
  createdAt: string; // Usar Date
  updatedAt: string; // Usar Date
  userId: string | null;
  categoryId: string;
};

type Quizzes = Quiz[];

export function useListQuiz() {
  const [quizzes, setQuizzes] = useState<Quizzes>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const token = getToken();

  useEffect(() => {
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

    fetchData();
  }, [token]);

  return { quizzes, error, loading };
}
