import React, { useCallback, useState } from 'react';
import useLocale from '@hooks/use-locale';
import { FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Container, Transactions } from './styles';
import { Loading } from '@components/Loading';
import { TransactionCard } from '@components/TransactionCard';
import { useListQuiz } from '@hooks/useListQuiz';
import { QuizDTO } from '@src/@types';
import { Header } from '@components/Header';

export function Dashboard() {
  const navigation = useNavigation();
  const { t } = useLocale();
  const { quizzes, loading, user, refreshFetchData } = useListQuiz();
  const [refreshing, setRefreshing] = useState(false);

  function handleQuestionnaires(quiz: QuizDTO) {
    navigation.navigate('QuestionnairesScreen', { quiz });
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshFetchData();
    setRefreshing(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Header
        title={t('TITLE.QUESTIONNAIRE_LIST')}
        userName={t('HOME.HELLO', { name: user.name })}
      />

      <Transactions>
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
          refreshControl={
            <RefreshControl colors={["#8E7DBE"]} refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </Transactions>
    </Container>
  );
}
