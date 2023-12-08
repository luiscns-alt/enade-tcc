import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { Dashboard } from '@screens/Dashboard';
import { Register } from '@screens/Register';
import { InformationPanel } from '@screens/InformationPanel';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 77,
        },
      }}
    >
      <Screen
        name='Listagem'
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name='format-list-bulleted'
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Screen
        name='Resumo'
        component={InformationPanel}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name='assignment' size={size} color={color} />
          ),
        }}
      />
      {/*<Screen*/}
      {/*  name="Cadastrar"*/}
      {/*  component={Register}*/}
      {/*  options={{*/}
      {/*    tabBarIcon: ({ size, color }) => (*/}
      {/*      <MaterialIcons name="pie-chart" size={size} color={color} />*/}
      {/*    ),*/}
      {/*  }}*/}
      {/*/>*/}
    </Navigator>
  );
}
