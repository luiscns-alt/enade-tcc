import React from 'react';
import { AppTabRoutes } from './app.tab.routes';
import { createStackNavigator } from '@react-navigation/stack';
import { Questionnaires } from '@screens/Questionnaires';
import { Dashboard } from "@screens/Dashboard";

const { Navigator, Screen } = createStackNavigator();
function AppStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='Dashboard' component={AppTabRoutes} />
      <Screen name='QuestionnairesScreen' component={Questionnaires} />
    </Navigator>
  );
}

export { AppStackRoutes };
