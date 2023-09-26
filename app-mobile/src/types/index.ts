interface UserData {
  createdAt: string;
  gamificationId: string | null;
  id: string;
  login: string;
  name: string;
  role: string;
  surname: string;
  updatedAt: string;
}

interface QuestionResponse {
  questionId: string;
  selectedAnswerId: string;
}

interface QuizResponse {
  userId: string;
  quizId: string;
  questionsResponse: QuestionResponse[];
}

export { UserData, QuestionResponse, QuizResponse };
