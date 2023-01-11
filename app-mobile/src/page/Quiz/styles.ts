import styled from 'styled-components/native';

import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Text = styled.Text``;

export const AreaView = styled.SafeAreaView`
  flex: 1;
`;

export const Bar = styled.StatusBar`
  color: ${({ theme }) => theme.colors.success};
`;

export const Container = styled.View`
  flex: 1;
  padding: 40px 16px;
  background-color: ${({ theme }) => theme.colors.background};
  /* position: 'relative'; */
`;

export const ContainerQuestion = styled.View``;

export const ViewQuestion = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

export const TextQuestion = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  opacity: 0.6;
  margin-right: ${RFValue(2)}px;
`;

export const TextIndexQuestion = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const TitleQuestion = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(30)}px;
`;

export const ContainerOptions = styled.View``;

export const TextOptions = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;

export const ContainerOptionsDiv = styled.View`
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.primary + '40'};
  background-color: ${({ theme }) => theme.colors.primary + '20'};
  height: ${RFValue(60)}px;
  border-radius: ${RFValue(20)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin: 10px 0;
`;

export const CorrectOption = styled.View`
  width: ${RFValue(30)}px;
  height: ${RFValue(30)}px;
  border-radius: ${RFValue(30 / 2)}px;
  background-color: ${({ theme }) => theme.colors.success};
  align-items: center;
  justify-content: center;
`;

export const OptionSelected = styled.View`
  width: ${RFValue(30)}px;
  height: ${RFValue(30)}px;
  border-radius: ${RFValue(30 / 2)}px;
  background-color: ${({ theme }) => theme.colors.attention};
  justify-content: center;
  align-items: center;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(24)}px;
`;

export const NextButton = styled.TouchableOpacity`
  margin-top: 20px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 20px;
  border-radius: 5px;
`;

export const TextNextButton = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.title};
  text-align: center;
`;

export const ScoreModal = styled.Modal``;

export const ContainerModal = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: center;
`;

export const ViewModal = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  width: 90%;
  border-radius: 20px;
  padding: 20px;
  align-items: center;
`;

export const ViewText = styled.Text`
  font-size: ${RFValue(30)}px;
  font-weight: bold;
`;

export const ScoreView = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0 20px;
`;

export const QuestionsText = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const RetryText = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(20)}px;
`;

export const Retry = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 20px;
  width: 100%;
  border-radius: 20px;
`;

export const ScoreText = styled.Text`
  font-size: ${RFValue(30)}px;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.success : theme.colors.attention};
`;

export const ProgressBar = styled.View`
  width: 100%;
  height: 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const ProgressBarAnimated = styled.View`
  height: ${RFValue(20)}px;
  border-radius: 20px;
  /* background-color: '#3498db'; */
`;
