import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Container } from './styles';
import { Header, Title } from '@screens/Login/SignUp/styles';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import useLocale from '@hooks/use-locale';

export function Error() {
  const navigation = useNavigation();
  const { t } = useLocale();

  const handleBack = async () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>{t('ERROR.GENERIC_ERROR')}</Title>
        </Header>
      </Container>
      <Button onPress={handleBack} title={t('ERROR.GO_BACK')} />
    </TouchableWithoutFeedback>
  );
}
