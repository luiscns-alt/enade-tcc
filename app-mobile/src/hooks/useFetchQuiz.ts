import { useState, useCallback } from 'react';
import { getToken } from '../contexts/auth';
import { api } from '../services/api';
import { API_ENDPOINTS } from '../util/constants';

type QuizData = {
  id: string;
  title: string;
  description: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string | null;
  categoryId: string;
  question: Question[];
};

type Question = {
  id: string;
  title: string;
  type: 'OBJECTIVE'; // "OTHER_TYPE"
  image: string | null;
  quizId: string;
  answers: Answer[];
};

type Answer = {
  id: string;
  text: string;
  isCorrect: boolean;
  questionId: string;
};

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
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizData>(initialQuizData);
  const [error, setError] = useState<any>(null);

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
