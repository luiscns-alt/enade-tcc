import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
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
import { CarImages, Container, Content, Header } from './styles';

interface Params {
  quiz: questionsDTO;
}

export function Questionnaires() {
  const navigation = useNavigation();
  const route = useRoute();
  const { quiz } = route.params as Params;

  const [questionnaires, setQuestionnaires] = useState<questionsDTO[]>();

  function handleBack() {
    navigation.goBack();
  }

  async function listQuiz() {
    const token = await getToken();
    try {
      await api
        .get(`/quiz/${quiz.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAllQuestions(res.data.questions);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function getUser() {
    const token = await getToken();
    try {
      await api
        .get(`/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data = res.data;
          const { email, name } = data;
          createStudent(name, email);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (errors) {
      console.log(errors);
    }
  }

  const [student, setStudent] = useState({});
  async function createStudent(name: string, email: string) {
    try {
      await api
        .post(`/student`, { name: name, email: email })
        .then((res) => {
          const idStudent = res.data.id;
          setStudent(idStudent);
          console.log('Successfully created student', res.data);
        })
        .catch((error) => {
          console.log('Error creating student', error);
        });
    } catch (errors) {
      console.log('errors', errors);
    }
  }

  async function postAnswer(data: any) {
      /**
       * * Salvar titulo da questão
       */
    const question = allQuestions[currentQuestionIndex]?.question;
    const { isCorrect, text } = data;
    try {
      await api
        .post(`/answer`, {
          studentId: student,
          question: question,
          answer: text,
          isCorrect: isCorrect,
        })
        .then((res) => {
          console.log('Successfully', res.data);
        })
        .catch((error) => {
          console.log('Error', error);
        });
    } catch (errors) {
      console.log(errors);
    }
  }

  useEffect(() => {
    const load = async () => {
      await listQuiz();
      await getUser();
    };
    load();
  }, []);

  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  function validateAnswer(selectedOption) {
    postAnswer(selectedOption);
    setCorrectOption(true);
    setCurrentOptionSelected(selectedOption);
    setIsOptionsDisabled(true);
    if (selectedOption.isCorrect == true) {
      // Set Score
      setScore(score + 1);
    }
    // Show Next Button
    setShowNextButton(true);
  }

  function handleNext() {
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  const restartQuiz = () => {
    setShowScoreModal(false);

    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  function renderQuestion() {
    return (
      <ContainerQuestion>
        {/* Question Counter */}
        <ViewQuestion>
          <TextQuestion>Question {currentQuestionIndex + 1} </TextQuestion>
          <TextIndexQuestion>/ {allQuestions.length}</TextIndexQuestion>
        </ViewQuestion>

        {/* Question */}
        <TitleQuestion>
          {allQuestions[currentQuestionIndex]?.question}
        </TitleQuestion>
      </ContainerQuestion>
    );
  }

  function renderOptions() {
    return (
      <ContainerOptions>
        {allQuestions[currentQuestionIndex]?.options.map((option) => (
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

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ['0%', '100%'],
  });

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

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>
      <CarImages></CarImages>
      <Content>
        {/* <Subject>{quiz.title}</Subject>
        <Title>{quiz.description}</Title> */}
        {/* <Title>{quiz.id}</Title> */}
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
                {score > allQuestions.length / 2 ? 'Congratulations!' : 'Oops!'}
              </ViewText>
              <ScoreView>
                <ScoreText isActive={score > allQuestions.length / 2}>
                  {score}
                </ScoreText>
                <QuestionsText>/ {allQuestions.length}</QuestionsText>
              </ScoreView>
              {/* Retry Quiz button */}
              <Retry onPress={restartQuiz}>
                <RetryText>Retry Quiz</RetryText>
              </Retry>
              <Retry style={{ marginTop: 10 }} onPress={handleBack}>
                <RetryText>Back</RetryText>
              </Retry>
            </ViewModal>
          </ContainerModal>
        </ScoreModal>
      </Content>
    </Container>
  );
}
