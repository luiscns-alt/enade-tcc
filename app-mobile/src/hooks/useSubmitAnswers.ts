import { useState } from 'react';
import { api } from '@services/api';
import { QuizResponse } from '../@types';
import { CustomError } from '@src/@types/error';
import { API_ENDPOINTS } from '../util/constants';

const useSubmitAnswers = () => {
  const [error, setError] = useState<CustomError>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const submitAnswers = async (answers: QuizResponse) => {
    try {
      setLoading(true);
      const response = await api.post(API_ENDPOINTS.QUIZ_RESPONSE, answers);
      return response.data;
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { submitAnswers, error, loading };
};

export { useSubmitAnswers };
