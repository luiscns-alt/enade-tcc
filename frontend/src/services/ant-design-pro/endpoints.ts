const BASE_URL: string = 'https://api-enade-nestjs-prisma-production.up.railway.app';
// const BASE_URL: string = 'http://localhost:3000';

// Endpoints
const QUIZ_ENDPOINT: string = `${BASE_URL}/quiz`;
const QUIZ_BY_USER_ENDPOINT: string = `${BASE_URL}/quiz/by-user`;
const QUESTION_ENDPOINT: string = `${BASE_URL}/question`;
const ANSWER_ENDPOINT: string = `${BASE_URL}/answer`;
const CATEGORIES_ENDPOINT = `${BASE_URL}/categories`;
const AUTH_LOGIN_ENDPOINT = `${BASE_URL}/auth/login`;
const AUTH_REGISTER_ENDPOINT = `${BASE_URL}/auth/register`;
const USER_ME_ENDPOINT = `${BASE_URL}/user/me`;
const QUIZ_RESPONSE_ENDPOINT = `${BASE_URL}/quiz-response`;
const QUIZ_RESPONSE_GET_ENDPOINT = `${BASE_URL}/quiz-response/quiz`;

export {
  QUIZ_ENDPOINT,
  QUIZ_BY_USER_ENDPOINT,
  QUESTION_ENDPOINT,
  ANSWER_ENDPOINT,
  CATEGORIES_ENDPOINT,
  AUTH_LOGIN_ENDPOINT,
  USER_ME_ENDPOINT,
  QUIZ_RESPONSE_ENDPOINT,
  QUIZ_RESPONSE_GET_ENDPOINT,
  AUTH_REGISTER_ENDPOINT,
};
