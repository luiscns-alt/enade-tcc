import React from 'react';
import { AppTabRoutes } from './app.tab.routes';
import { createStackNavigator } from '@react-navigation/stack';
import { Quiz } from '@screens/Quiz';
import { Questionnaires } from '@screens/Questionnaires';

const { Navigator, Screen } = createStackNavigator();
function AppStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='Listagem' component={AppTabRoutes} />
      <Screen name='Quiz' component={Quiz} />
      <Screen name='QuestionnairesScreen' component={Questionnaires} />
    </Navigator>
  );
}

export { AppStackRoutes };
