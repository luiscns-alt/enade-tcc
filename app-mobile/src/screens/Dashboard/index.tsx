import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Header,
  Icon,
  LogoutButton,
  Photo,
  Title,
  Transactions,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
} from './styles';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { QuizDTO } from 'src/@types';
import { TransactionCard } from '@components/TransactionCard';
import { useListQuiz } from '@hooks/useListQuiz';
import { useAuth } from '@hooks/useAuth';

export function Dashboard() {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  const { quizzes, loading } = useListQuiz();

  async function handleSignOut() {
    await signOut();
  }

  function handleQuestionnaires(quiz: QuizDTO) {
    navigation.navigate('QuestionnairesScreen', { quiz });
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size='large' color='#666' />
      </View>
    );
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
        <FlatList
          data={quizzes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TransactionCard
              data={item}
              onPress={() => handleQuestionnaires(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: getBottomSpace(),
          }}
        />
      </Transactions>
    </Container>
  );
}
