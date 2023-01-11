import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard';
import { questionsDTO } from '../../dtos/questionsDTO';
import { api } from '../../services/api';

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  LogoutButton,
  Transactions,
  Title,
  TransactionList,
} from './styles';

import QuestionsData from '../../services/server.json';
import { getToken, useAuth } from '../../contexts/auth';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [questionnaires, setQuestionnaires] = useState<questionsDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { user, signOut } = useAuth();
  const [toReceive, setToReceive] = useState([]);

  function handleSignOut() {
    signOut();
  }

  // const data: DataListProps[] = QuestionsData[];
  function handleQuestionnaires(quiz: questionsDTO) {
    // @ts-ignore
    navigation.navigate('Questionnaires', { quiz });
  }

    async function listQuiz() {
      const token = await getToken();
      try {
        await api
          .get(`/quiz`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            const { items, meta } = res.data;
            setToReceive(items);
            return items;
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }

  useEffect(() => {
    const load = async () => {
    await listQuiz();
    };
    load();
  }, []);

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
        <Title>Listagem</Title>
        <TransactionList
          data={toReceive}
          keyExtractor={(item: { id: any }) => item.id}
          renderItem={({ item }) => (
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
