import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Dashboard } from '../page/Dashboard';
import { Register } from '../page/Register';
import { Questionnaires } from '../page/Questionnaires';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SignIn } from '../page/Login/SignIn';
import { SignUp } from '../page/Login/SignUp';
import { Quiz } from '../page/Quiz';

const { Navigator, Screen } = createBottomTabNavigator();
const SimpleStack = createStackNavigator();

// function AppRoutes() {
//   const theme = useTheme();

//   return (
//     <Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: theme.colors.secondary,
//         tabBarInactiveTintColor: theme.colors.text,
//         tabBarLabelPosition: 'beside-icon',
//         tabBarStyle: {
//           paddingVertical: Platform.OS === 'ios' ? 20 : 0,
//           height: 88,
//         },
//       }}
//     >
//       <Screen
//         name='Listagem'
//         component={StackRoutes}
//         options={{
//           tabBarIcon: ({ size, color }) => (
//             <MaterialIcons
//               name='format-list-bulleted'
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />
//       <Screen
//         name='Cadastrar'
//         component={Register}
//         options={{
//           tabBarIcon: ({ size, color }) => (
//             <MaterialIcons name='note-add' size={size} color={color} />
//           ),
//         }}
//       />
//       <Screen
//         name='Resumo'
//         component={Register}
//         options={{
//           tabBarIcon: ({ size, color }) => (
//             <MaterialIcons name='pie-chart' size={size} color={color} />
//           ),
//         }}
//       />
//     </Navigator>
//   );
// }

function StackRoutes() {
  return (
    <SimpleStack.Navigator screenOptions={{ headerShown: false }}>
      <SimpleStack.Screen name='Listagem' component={Dashboard} />
      <SimpleStack.Screen name='Quiz' component={Quiz} />
      <SimpleStack.Screen name='Questionnaires' component={Questionnaires} />
    </SimpleStack.Navigator>
  );
}

export { StackRoutes };
