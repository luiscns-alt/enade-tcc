import { message } from 'antd';

export function mergeObjects(initialState: API.QuestionDTO, field: API.Question) {
  const mergedObject: API.QuestionDTO = {
    id: initialState.id,
    title: initialState.title,
    type: initialState.type,
    image: initialState.image,
    quizId: initialState.quizId,
    answers: [],
  };

  if (initialState && initialState.answers) {
    for (let i = 0; i < initialState.answers.length; i++) {
      const answerKey = `answer_${i}`;
      const isCorrectKey = `isCorrect_${i}`;

      if (mergedObject && mergedObject.answers) {
        if (field[answerKey] !== undefined && field[isCorrectKey] !== undefined) {
          mergedObject.answers.push({
            id: initialState.answers[i].id,
            text: field[answerKey],
            isCorrect: field[isCorrectKey],
            questionId: initialState.id,
          });
        }
      }
    }
  }

  return mergedObject;
}

export const showSuccessMessage = async (translation: any, messageId: string) => {
  await message.success(translation.formatMessage({ id: messageId }));
};

export const showFailMessage = async (translation: any, messageId: string) => {
  await message.success(translation.formatMessage({ id: messageId }));
};

export const showErrorMessage = async (
  translation: any,
  messageId: string,
  additionalMessage?: string,
) => {
  const baseErrorMessage = translation.formatMessage({ id: messageId });
  const errorMessage = additionalMessage
    ? `${baseErrorMessage} - ${additionalMessage}`
    : baseErrorMessage;
  await message.error(errorMessage);
  return true;
};

export const getIds = <T>(items: T[], key: keyof T): string[] => {
  return items.map((item) => `'${item[key]}'`);
};

export const formatDate = (dataStr: string) => {
  const dataObj = new Date(dataStr);
  const dia = String(dataObj.getDate()).padStart(2, '0');
  const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Os meses são de 0 a 11, então adicionamos 1
  const ano = dataObj.getFullYear();
  return `${dia}/${mes}/${ano}`;
};
