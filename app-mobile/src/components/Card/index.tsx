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
import { Option } from '../Option';

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

export function Card({ data, ...rest }) {
  // @ts-ignore

  function handle() {
    console.log(data);
  }

  useEffect(() => {
    handle();
  }, []);
  return (
    <Container {...rest}>
      <Title>{data.question}</Title>
      {/*<Text>{data.answers}</Text>*/}
      <FlatList
        data={data.answers}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Option data={item} />}
      />
    </Container>
  );
}
