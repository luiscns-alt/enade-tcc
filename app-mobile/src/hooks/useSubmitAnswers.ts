import { useState } from 'react';
import { getToken } from '../contexts/auth';
import { api } from '../services/api';
import { API_ENDPOINTS } from '../util/constants';
import { QuizResponse } from '../types';

const useSubmitAnswers = () => {
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const token = getToken(); // Assuming you have a getToken function available

  const submitAnswers = async (answers: QuizResponse) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.post(
        API_ENDPOINTS.QUIZ_RESPONSE,
        answers,
        config
      );
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

export default useSubmitAnswers;
