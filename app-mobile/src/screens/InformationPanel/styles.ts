import styled from 'styled-components/native';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;
export const Transactions = styled.View`
  flex: 1%;
  padding: 0 14px;

  margin-top: ${RFPercentage(-30)}px;
`;
