import React from 'react';
import useLocale from '@hooks/use-locale';
import { FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Container, Transactions } from './styles';
import { Header } from '@components/Header';
import { Loading } from '@components/Loading';
import { TransactionCard } from '@components/TransactionCard';
import { useQuizResponseUser } from '@hooks/useQuizResponseUser';
import { useNavigation } from '@react-navigation/native';

export function InformationPanel() {
  const { t } = useLocale();
  const navigation = useNavigation();
  const { responseQuiz, loading, user } = useQuizResponseUser();

  function handleListCompletedQuestionnaires(questionnairesId: string) {
    navigation.navigate('ListCompletedQuestionnairesScreen', {
      questionnairesId,
    });
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
            <TransactionCard
              data={item.quiz}
              onPress={() => handleListCompletedQuestionnaires(item.id)}
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
