import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard';
import { questionsDTO } from '../../dtos/questionsDTO';
import {
  Container,
  Header,
  Icon,
  LogoutButton,
  Photo,
  Title,
  TransactionList,
  Transactions,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
} from './styles';
import { useAuth } from '../../contexts/auth';
import { useListQuiz } from '../../hooks/useListQuiz';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();
  const { quizzes, error, loading } = useListQuiz();

  function handleSignOut() {
    signOut();
  }

  function handleQuestionnaires(quiz: questionsDTO) {
    // @ts-ignore
    navigation.navigate('Questionnaires', { quiz });
  }

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/82232848?v=4',
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Name </UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={handleSignOut}>
            <Icon name='power' />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <Transactions>
        <Title>Lista de Questionário</Title>
        <TransactionList
          data={quizzes}
          keyExtractor={(item: { id: any }) => item.id}
          renderItem={({ item }: any) => (
            <TransactionCard
              data={item}
              onPress={() => handleQuestionnaires(item)}
            />
          )}
        />
      </Transactions>
    </Container>
  );
}
