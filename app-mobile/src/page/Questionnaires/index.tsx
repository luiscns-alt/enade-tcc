import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BackButton } from '../../components/BackButton';
import { getToken } from '../../contexts/auth';
import { questionsDTO } from '../../dtos/questionsDTO';
import { api } from '../../services/api';
import {
  ContainerModal,
  ContainerOptions,
  ContainerOptionsDiv,
  ContainerQuestion,
  CorrectOption,
  Icon,
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
} from '../Quiz/styles';
import { Container, Content, Divider, Header } from './styles';
import { useFetchQuiz } from '../../hooks/useFetchQuiz';

interface Params {
  quiz: questionsDTO;
}

export function Questionnaires() {
  const navigation = useNavigation();
  const { quiz } = useRoute().params as Params;
  const [student, setStudent] = useState({});
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [progress, setProgress] = useState(new Animated.Value(0));

  const { loading, questions, error, fetchQuiz } = useFetchQuiz(quiz.id);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const handleBack = () => navigation.goBack();

  const fetchDataFromAPI = async (endpoint: string) => {
    const token = await getToken();
    const { data } = await api.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

  const createStudent = async (name: string, email: string) => {
    try {
      const response = await api.post(`/student`, { name, email });
      setStudent(response.data.id);
      console.log('Successfully created student', response.data);
    } catch (error) {
      console.log('Error creating student', error);
    }
  };

  const postAnswer = async (option: any) => {
    const question = questions?.question[currentQuestionIndex];
    try {
      await api.post(`/answer`, {
        studentId: student,
        question,
        answer: option.text,
        isCorrect: option.isCorrect,
      });
    } catch (error) {
      console.log('Error posting answer', error);
    }
  };

  const validateAnswer = (selectedOption: any) => {
    setCurrentOptionSelected(selectedOption);
    setIsOptionsDisabled(true);
    if (selectedOption.isCorrect) {
      setScore(score + 1);
    }
    setShowNextButton(true);
  };

  const handleNext = () => {
    if (isLastQuestion()) {
      setShowScoreModal(true);
    } else {
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
      return null; // fallback aqui
    }

    return (
      <ContainerQuestion>
        {/* Question Counter */}
        <ViewQuestion>
          <TextQuestion>Pergunta {currentQuestionIndex + 1} </TextQuestion>
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
      return null; //  fallback aqui
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
    return <ViewText>Carregando...</ViewText>;
  }

  if (error) {
    return (
      <ViewText>
        Ocorreu um erro ao buscar os dados. Por favor, tente novamente.
      </ViewText>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>
      <Divider />
      {loading ? null : (
        <Content>
          {/* ProgressBar */}
          {/*{renderProgressBar()}*/}

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
                    ? 'Parabéns!'
                    : 'Oops!'}
                </ViewText>
                <ScoreView>
                  <ScoreText isActive={score > questions?.question?.length / 2}>
                    {score}
                  </ScoreText>
                  <QuestionsText>/ {questions?.question?.length}</QuestionsText>
                </ScoreView>
                {/* Retry Quiz button */}
                <Retry onPress={restartQuiz}>
                  <RetryText>Repetir teste</RetryText>
                </Retry>
                <Retry style={{ marginTop: 10 }} onPress={handleBack}>
                  <RetryText>Voltar a tela inicial</RetryText>
                </Retry>
              </ViewModal>
            </ContainerModal>
          </ScoreModal>
        </Content>
      )}
    </Container>
  );
}
