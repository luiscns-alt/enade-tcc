import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AppStackRoutes } from './app.stack.routes';
import { AuthRoutes } from './auth.routes';
import { useAuth } from '@hooks/useAuth';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
const Routes: React.FC = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size='large' color='#666' />
      </View>
    );
  }

  return signed ? <AppStackRoutes /> : <AuthRoutes />;
};

export default Routes;
