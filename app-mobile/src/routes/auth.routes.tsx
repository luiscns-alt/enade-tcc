import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn } from '@screens/Login/SignIn';
import { SignUp } from '@screens/Login/SignUp';
import Toast from 'react-native-toast-message';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name={'SignIn'} component={SignIn} />
      <Screen name={'Register'} component={SignUp} />
    </Navigator>
  );
}
