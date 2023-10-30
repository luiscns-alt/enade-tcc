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
import { QuizDTO } from '@src/@types';
import useLocale from '@hooks/use-locale';

interface Props extends RectButtonProps {
  data: QuizDTO;
}

export function TransactionCard({ data, ...rest }: Props) {
  const { t } = useLocale();

  return (
    <Container {...rest}>
      <Title>{t('HOME.TITLE')}</Title>
      <Amount>{data.title}</Amount>
      <Title>{t('HOME.DESCRIPTION')}</Title>
      <Title>{data.description}</Title>

      <Footer>
        <Category>
          <CategoryName>{data.categoryId}</CategoryName>
        </Category>
        <Date>{data.createdAt}</Date>
      </Footer>
    </Container>
  );
}
