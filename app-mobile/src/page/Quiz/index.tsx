import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  AreaView,
  Bar,
  Container,
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
} from './styles';
import data from '../../data/QuizData';
import { Animated } from 'react-native';

export function Quiz() {
  const allQuestions = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  function validateAnswer(selectedOption) {
    let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption == correct_option) {
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
          <TextQuestion>{currentQuestionIndex + 1} </TextQuestion>
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
          <TouchableOpacity onPress={() => validateAnswer(option)} key={option}>
            <ContainerOptionsDiv>
              <TextOptions>{option}</TextOptions>
              {/* Show check or cross icon on correct answer */}
              {option == correctOption ? (
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
              backgroundColor: '#8E7DBE',
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
    <AreaView>
      <Bar />
      <Container>
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
            </ViewModal>
          </ContainerModal>
        </ScoreModal>

        {/* Background Image */}
        {/* <Image
          source={require('../assets/images/.png')}
          style={{
            width: SIZES.width,
            height: 130,
            zIndex: -1,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0.5,
          }}
          resizeMode={'contain'}
        /> */}
      </Container>
    </AreaView>
  );
}
