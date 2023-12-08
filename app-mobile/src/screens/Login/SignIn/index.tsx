import React from 'react';
import * as Yup from 'yup';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { Keyboard, ToastAndroid, TouchableWithoutFeedback } from 'react-native';
import { Button } from '@components/Button';
import { InputForm } from '@components/Form/InputForm';
import {
  Container,
  Fields,
  Form,
  Header,
  Link,
  Row,
  Text,
  Title,
} from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '@hooks/useAuth';
import useLocale from '@hooks/use-locale';

export type LoginFormData = FieldValues & {
  username: string;
  password: string;
};

export function SignIn() {
  const navigation = useNavigation();
  const { signIn } = useAuth();
  const { t } = useLocale();

  const schema = Yup.object().shape({
    username: Yup.string().required(t('FORM_ERROR_MESSAGES.NAME_REQUIRED')),
    password: Yup.string().required(t('FORM_ERROR_MESSAGES.PASSWORD_REQUIRED')),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister: SubmitHandler<LoginFormData> = async (form) => {
    const data = {
      login: form.username,
      password: form.password,
    };
    await signIn(data);
  };

  function handleRegistration() {
    navigation.navigate('Register');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>{t('LOGIN.SCREEN_NAME')}</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name='username'
              control={control}
              placeholder={t('FORM.EMAIL_INPUT')}
              // autoCapitalize="sentences"
              autoCorrect={false}
              autoCapitalize='none'
              autoComplete='email'
              textContentType='emailAddress'
              keyboardType='email-address'
              error={errors.username && errors.username.message}
            />
            <InputForm
              name='password'
              control={control}
              placeholder={t('FORM.PASSWORD_INPUT')}
              // autoCapitalize="sentences"
              // autoCorrect={false}
              secureTextEntry
              error={errors.password && errors.password.message}
            />
          </Fields>
          <Button
            onPress={handleSubmit(handleRegister as SubmitHandler<FieldValues>)}
            title={t('FORM.LOGIN_BUTTON')}
          />
        </Form>
        <Row>
          <Text>{t('LOGIN.NO_ACCOUNT')}</Text>
          <TouchableOpacity onPress={handleRegistration}>
            <Link>{t('SIGN_UP.REGISTER')}</Link>
          </TouchableOpacity>
        </Row>
      </Container>
    </TouchableWithoutFeedback>
  );
}
