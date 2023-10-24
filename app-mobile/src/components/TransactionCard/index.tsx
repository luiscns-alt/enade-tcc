import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import {
  Amount,
  Category,
  CategoryName,
  Container,
  Date,
  Footer,
  Title,
} from './styles';
import { QuizDTO } from '../../@types';

interface Props extends RectButtonProps {
  data: QuizDTO;
}

export function TransactionCard({ data, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Title>Título: </Title>
      <Amount>{data.title}</Amount>
      <Title>Descrição: </Title>
      <Title>{data.description}</Title>

      <Footer>
        <Category>
          {/* <Icon name={mocks.category.icon} /> */}
          <CategoryName>{data.categoryId}</CategoryName>
        </Category>
        <Date>{data.createdAt}</Date>
      </Footer>
    </Container>
  );
}
