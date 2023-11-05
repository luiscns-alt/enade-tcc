interface UserData {
  createdAt: string;
  gamificationId: string | null;
  id: string;
  login: string;
  name: string;
  password: string;
  role: string;
  surname: string;
  updatedAt: string;
}

type QuizDTO = {
  id: string;
  title: string;
  description: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string | null;
  categoryId: string;
};

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
  type: string;
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

interface QuestionResponse {
  questionId: string;
  selectedAnswerId: string;
}

interface QuizResponse {
  userId: string;
  quizId: string;
  questionsResponse: QuestionResponse[];
}

interface QuizResponseUser {
  id: string;
  userId: string;
  quizId: string;
  answeredAt: string;
  quiz: QuizDTO;
  questionsResponse: QuestionResponseWithDetails[];
}

interface QuestionResponseWithDetails extends QuestionResponse {
  id: string;
  quizResponseId: string;
  discursiveAnswer: string | null;
  question: Question;
}

interface ApiError {
  statusCode: number;
  message: 'Unauthorized';
}

export {
  ApiError,
  QuestionResponse,
  Question,
  QuizDTO,
  QuizData,
  QuizResponse,
  UserData,
  QuizResponseUser,
  Answer,
  QuestionResponseWithDetails,
};
