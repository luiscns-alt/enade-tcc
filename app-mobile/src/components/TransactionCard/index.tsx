import React from 'react';
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

interface Category {
  name: string;
  // icon: string;
}

export interface TransactionCardProps {
  title: string;
  amount: string;
  category: Category;
  date: string;
}

interface Props extends RectButtonProps {
  data: questionsDTO;
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
          {/* <Icon name={data.category.icon} /> */}
          <CategoryName>{data.totalItems}</CategoryName>
        </Category>
        <Date>{data.isActive}</Date>
      </Footer>
    </Container>
  );
}
