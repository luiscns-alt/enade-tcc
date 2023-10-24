export const API_ENDPOINTS = {
  FETCH_QUIZ_BY_ID: (quizId: string) => `/quiz/${quizId}`,
  FETCH_ALL_QUESTIONS: '/quiz/',
  QUIZ_RESPONSE: '/quiz-response',
  USER_ME: '/user/me',
  LOGIN: '/auth/login',
  REGISTER: '/user/register',
};
