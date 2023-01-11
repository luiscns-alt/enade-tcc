import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Questionnaires } from '../page/Questionnaires';

const { Navigator, Screen } = createStackNavigator();

export function Stac() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='Questionnaires' component={Questionnaires} />
    </Navigator>
  );
}
