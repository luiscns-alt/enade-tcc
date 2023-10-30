import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BackButton } from '@components/BackButton';
import {
  Container,
  ContainerModal,
  ContainerOptions,
  ContainerOptionsDiv,
  ContainerQuestion,
  Content,
  CorrectOption,
  Divider,
  Header,
  Icon,
  LoadContainer,
  NextButton,
  OptionSelected,
  ProgressBar,
  QuestionsText,
  Retry,
  RetryText,
  ScoreModal,
  ScoreText,
  ScoreView,
  TextIndexQuestion,
  TextNextButton,
  TextOptions,
  TextQuestion,
  TitleQuestion,
  ViewModal,
  ViewQuestion,
  ViewText,
} from './styles';
import { useFetchQuiz } from '@hooks/useFetchQuiz';
import { Question, QuestionResponse } from '@src/@types';
import { useTheme } from 'styled-components';
import { useSubmitAnswers } from '@hooks/useSubmitAnswers';
import { useMe } from '@hooks/useMe';
import useLocale from '@hooks/use-locale';
import { Error } from '@screens/Error';

interface Params {
  quiz: Question;
}

export function Questionnaires() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { t } = useLocale();
  const { quiz } = useRoute().params as Params;
  const { loading, questions, error, fetchQuiz } = useFetchQuiz(quiz.id);
  const { submitAnswers } = useSubmitAnswers();
  const { user } = useMe();

  const [allQuestions, setAllQuestions] = useState<QuestionResponse[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [progress, setProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const handleBack = async () => {
    navigation.goBack();
  };

  const handleSaveBack = async () => {
    const createQuizResponse = {
      userId: user.id,
      quizId: quiz.id,
      questionsResponse: allQuestions,
    };
    submitAnswers(createQuizResponse).then(() => {
      navigation.goBack();
    });
  };

  const validateAnswer = (selectedOption: any) => {
    setAllQuestions((prevData) => [
      ...prevData,
      {
        selectedAnswerId: selectedOption.id,
        questionId: selectedOption.questionId,
      },
    ]);
    setCurrentOptionSelected(selectedOption);
    setIsOptionsDisabled(true);
    if (selectedOption.isCorrect) {
      setCorrectOption(selectedOption.isCorrect);
      setScore(score + 1);
    }
    setShowNextButton(true);
  };

  const handleNext = () => {
    if (isLastQuestion()) {
      setShowScoreModal(true);
    } else {
      setCorrectOption(null);
      moveToNextQuestion();
    }
    animateProgressBar();
  };

  const isLastQuestion = () =>
    currentQuestionIndex === questions?.question?.length - 1;

  const moveToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    resetQuestionState();
  };

  const resetQuestionState = () => {
    setCurrentOptionSelected(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
  };

  const animateProgressBar = () => {
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const restartQuiz = () => {
    setShowScoreModal(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    resetQuestionState();
    animateProgressBar();
  };

  const progressAnim =
    questions.question.length > 0
      ? progress.interpolate({
          inputRange: [0, questions.question.length],
          outputRange: ['0%', '100%'],
        })
      : new Animated.Value(0);

  function renderQuestion() {
    if (!questions || !questions.question) {
      return null;
    }

    const isIndexValid =
      currentQuestionIndex >= 0 &&
      currentQuestionIndex < questions.question.length;

    if (!isIndexValid) {
      return <Error />;
    }

    return (
      <ContainerQuestion>
        {/* Question Counter */}
        <ViewQuestion>
          <TextQuestion>
            {t('QUESTIONNAIRES.QUESTION')} {currentQuestionIndex + 1}{' '}
          </TextQuestion>
          <TextIndexQuestion>/ {questions?.question?.length}</TextIndexQuestion>
        </ViewQuestion>

        {/* Question */}
        <TitleQuestion>
          {questions?.question[currentQuestionIndex]?.title}
        </TitleQuestion>
      </ContainerQuestion>
    );
  }

  function renderOptions() {
    if (!questions || !questions.question) {
      return null;
    }

    const isIndexValid =
      currentQuestionIndex >= 0 &&
      currentQuestionIndex < questions.question.length;

    if (!isIndexValid) {
      return <Error />;
    }

    return (
      <ContainerOptions>
        {questions?.question[currentQuestionIndex]?.answers?.map((option) => (
          <TouchableOpacity
            onPress={() => validateAnswer(option)}
            disabled={isOptionsDisabled}
            key={option.id}
          >
            {/* <TouchableOpacity> */}
            <ContainerOptionsDiv>
              <TextOptions>{option.text}</TextOptions>
              {/* Show check or cross icon on correct answer */}
              {option.isCorrect == correctOption ? (
                <CorrectOption>
                  <Icon name='check' />
                </CorrectOption>
              ) : option == currentOptionSelected ? (
                <OptionSelected>
                  <Icon name='x' />
                </OptionSelected>
              ) : null}
            </ContainerOptionsDiv>
          </TouchableOpacity>
        ))}
      </ContainerOptions>
    );
  }

  function renderNextButton() {
    if (showNextButton) {
      return (
        <NextButton onPress={handleNext}>
          <TextNextButton>Next</TextNextButton>
        </NextButton>
      );
    } else {
      return null;
    }
  }

  function renderProgressBar() {
    return (
      <ProgressBar>
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: '#3498db',
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </ProgressBar>
    );
  }

  if (loading) {
    return (
      <LoadContainer>
        <ActivityIndicator color={theme.colors.primary} size='large' />
      </LoadContainer>
    );
  }

  if (error) {
    return <ViewText>{t('ERROR.DATA_FETCH_ERROR')}</ViewText>;
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>
      <Divider />
      {!loading && (
        <Content>
          {/* ProgressBar */}
          {renderProgressBar()}

          {/* Question */}
          {renderQuestion()}

          {/* Options */}
          {renderOptions()}

          {/* Next Button */}
          {renderNextButton()}

          {/* Score Modal */}
          <ScoreModal
            animationType='slide'
            transparent={true}
            visible={showScoreModal}
          >
            <ContainerModal>
              <ViewModal>
                <ViewText>
                  {score > questions?.question?.length / 2
                    ? t('QUESTIONNAIRES.CONGRATULATIONS')
                    : t('QUESTIONNAIRES.OOPS')}
                </ViewText>
                <ScoreView>
                  <ScoreText isActive={score > questions?.question?.length / 2}>
                    {score}
                  </ScoreText>
                  <QuestionsText>/ {questions?.question?.length}</QuestionsText>
                </ScoreView>
                {/* Retry Quiz button */}
                <Retry onPress={restartQuiz}>
                  <RetryText>{t('QUESTIONNAIRES.REPEAT_TEST')}</RetryText>
                </Retry>
                <Retry style={{ marginTop: 10 }} onPress={handleSaveBack}>
                  <RetryText>
                    {t('QUESTIONNAIRES.GO_BACK_TO_HOME_SCREEN')}
                  </RetryText>
                </Retry>
              </ViewModal>
            </ContainerModal>
          </ScoreModal>
        </Content>
      )}
    </Container>
  );
}
