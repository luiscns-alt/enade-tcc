import React from 'react';
import useLocale from '@hooks/use-locale';
import { FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Container, Transactions } from './styles';
import { Header } from '@components/Header';
import { Loading } from '@components/Loading';
import { TransactionCard } from '@components/TransactionCard';
import { useAuth } from '@hooks/useAuth';
import { useQuizResponseUser } from '@hooks/useQuizResponseUser';

export function InformationPanel() {
  const { t } = useLocale();
  const { signOut } = useAuth();
  const { responseQuiz, loading, user } = useQuizResponseUser();

  async function handleSignOut() {
    await signOut();
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Header
        title={t('TITLE.QUESTIONNAIRE_RESPONSES')}
        userName={t('HOME.HELLO', { name: user.name })}
      />
      <Transactions>
        <FlatList
          data={responseQuiz}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TransactionCard data={item.quiz} onPress={() => {}} />
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
