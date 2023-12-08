import React from 'react';
import { AppTabRoutes } from './app.tab.routes';
import { createStackNavigator } from '@react-navigation/stack';
import { Questionnaires } from '@screens/Questionnaires';
import { ListCompletedQuestionnaires } from '@screens/ListCompletedQuestionnaires';
import Toast from 'react-native-toast-message';

const { Navigator, Screen } = createStackNavigator();
function AppStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='Dashboard' component={AppTabRoutes} />
      <Screen name='QuestionnairesScreen' component={Questionnaires} />
      <Screen
        name='ListCompletedQuestionnairesScreen'
        component={ListCompletedQuestionnaires}
      />
    </Navigator>
  );
}

export { AppStackRoutes };
