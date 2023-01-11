import React, { useEffect } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { questionsDTO } from '../../dtos/questionsDTO';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';
import { FlatList, Text } from 'react-native';

interface Category {
  name: string;
  // icon: string;
}

export interface TransactionCardProps {
  question: string;
  answers: [];
  correctIndex: number;
}

interface Props {
  data: questionsDTO;
}

export function Option({ data, ...rest }) {
  return (
    <Container {...rest}>
      <Title>{data}</Title>
    </Container>
  );
}
