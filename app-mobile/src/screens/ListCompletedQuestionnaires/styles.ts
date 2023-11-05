import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

interface AnswerTextProps {
  isCorrect: boolean;
  isAnswerCorrect: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.ScrollView.attrs({
  showVerticalScrollIndicator: false,
})``;

export const Transactions = styled.View`
  flex: 1%;
  padding: 0 14px;
  margin-top: ${RFPercentage(-34)}px;
`;

export const ContainerQuiz = styled(RectButton as any)`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  padding: 17px 24px;
  margin-bottom: 16px;
  elevation: 3; /* Shadow for Android */
  shadow-opacity: 0.1; /* Shadow for iOS */
  shadow-radius: 3.84px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const AnswerText = styled.Text<AnswerTextProps>`
  font-size: 14px;
  color: ${({ theme, isCorrect, isAnswerCorrect }) =>
    isAnswerCorrect
      ? theme.colors.primary // uma nova cor para a resposta selecionada
      : isCorrect
      ? theme.colors.success
      : theme.colors.attention};
`;
