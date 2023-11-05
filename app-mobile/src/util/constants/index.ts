import { QuizData, QuizResponseUser } from '@src/@types';

export const API_ENDPOINTS = {
  FETCH_QUIZ_BY_ID: (quizId: string) => `/quiz/${quizId}`,
  FETCH_ALL_QUESTIONS: '/quiz/',
  QUIZ_RESPONSE: '/quiz-response',
  USER_ME: '/user/me',
  LOGIN: '/auth/login',
  REGISTER: '/user/register',
  FETCH_QUIZ_RESPONSE_USER: (userId: string) => `/quiz-response/user/${userId}`,
  QUIZ_RESPONSE_BY_ID_USER: (id: string) => `/quiz-response/${id}`,
};

export const INITIAL_QUIZ_DATA: QuizData = {
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

export const INITIAL_QUIZ = [
  {
    id: '',
    userId: '',
    quizId: '',
    answeredAt: '',
    quiz: {
      id: '',
      title: '',
      description: '',
      published: false,
      createdAt: '',
      updatedAt: '',
      userId: '',
      categoryId: '',
    },
    questionsResponse: [
      {
        id: '',
        quizResponseId: '',
        questionId: '',
        selectedAnswerId: '',
        discursiveAnswer: '',
        question: {
          id: '',
          title: '',
          type: '',
          image: '',
          quizId: '',
          answers: [
            {
              id: '',
              text: '',
              isCorrect: false,
              questionId: '',
            },
          ],
        },
      },
    ],
  },
];

export const INITIAL_QUIZ_RESPONSE_USER: QuizResponseUser = {
  id: '',
  userId: '',
  quizId: '',
  answeredAt: '',
  quiz: {
    id: '',
    title: '',
    description: '',
    published: false,
    createdAt: '',
    updatedAt: '',
    userId: null,
    categoryId: '',
  },
  questionsResponse: [
    {
      id: '',
      quizResponseId: '',
      questionId: '',
      selectedAnswerId: '',
      discursiveAnswer: null,
      question: {
        id: '',
        title: '',
        type: '',
        image: null,
        quizId: '',
        answers: [
          {
            id: '',
            text: '',
            isCorrect: false,
            questionId: '',
          },
        ],
      },
    },
  ],
};
