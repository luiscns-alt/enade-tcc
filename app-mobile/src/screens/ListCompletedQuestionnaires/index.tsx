import React from 'react';
import { useRoute } from '@react-navigation/native';
import {
  AnswerText,
  Container,
  ContainerQuiz,
  Content,
  Title,
  Transactions,
} from '@screens/ListCompletedQuestionnaires/styles';
import { useQuizResponseByIdUser } from '@hooks/useQuizResponseByIdUser';
import { Loading } from '@components/Loading';
import { Error } from '@screens/Error';
import { Header } from '@components/Header';
import useLocale from '@hooks/use-locale';

interface Params {
  questionnairesId: string;
}

export function ListCompletedQuestionnaires() {
  const { t } = useLocale();
  const { questionnairesId } = useRoute().params as Params;
  const { error, loading, quizResponseByIdUser } =
    useQuizResponseByIdUser(questionnairesId);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <Container>
      <Header title={t('TITLE.ANSWERS')} />
      <Transactions>
        <Content>
          <ContainerQuiz>
            <Title>{t('HOME.TITLE')}</Title>
            <Title>{quizResponseByIdUser?.quiz?.title}</Title>
            <Title>{t('HOME.DESCRIPTION')}</Title>
            <Title>{quizResponseByIdUser?.quiz?.description}</Title>
          </ContainerQuiz>
          {quizResponseByIdUser?.questionsResponse?.map((questionResponse) => (
            <ContainerQuiz key={questionResponse.id}>
              <Title>{questionResponse.question.title}</Title>
              {questionResponse.question.answers.map((answer) => {
                const isAnswerCorrect =
                  answer.id === questionResponse.selectedAnswerId;
                return (
                  <AnswerText
                    key={answer.id}
                    isCorrect={answer.isCorrect}
                    isAnswerCorrect={isAnswerCorrect}
                  >
                    {answer.text}
                  </AnswerText>
                );
              })}
            </ContainerQuiz>
          ))}
        </Content>
      </Transactions>
    </Container>
  );
}
