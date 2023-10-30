import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';
import theme from './global/styles/theme';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from './routes';
import { AuthProvider } from '@hooks/useAuth';
import { I18nextProvider } from 'react-i18next';
import { initI18n } from './i18n/i18n.config';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <I18nextProvider i18n={initI18n('pt-BR')}>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </I18nextProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
