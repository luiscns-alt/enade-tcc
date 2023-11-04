import React from 'react';
import * as Yup from 'yup';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
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

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignUp() {
  const navigation = useNavigation();
  const { registerUser } = useAuth();
  const { t } = useLocale();

  const schema = Yup.object().shape({
    name: Yup.string().required(t('FORM_ERROR_MESSAGES.NAME_REQUIRED')),
    email: Yup.string().required(t('FORM_ERROR_MESSAGES.EMAIL_REQUIRED')),
    password: Yup.string().required(t('FORM_ERROR_MESSAGES.PASSWORD_REQUIRED')),
    confirmPassword: Yup.string().required(
      t('FORM_ERROR_MESSAGES.CONFIRM_PASSWORD_REQUIRED')
    ),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleRegister(form: FormData) {
    const data = {
      name: form.name,
      email: form.email,
      password: form.password,
      confirm: form.confirmPassword,
    };
    registerUser(data);
  }

  function handleLogin() {
    navigation.navigate('SignIn');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>{t('SIGN_UP.SCREEN_NAME')}</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name='name'
              control={control}
              placeholder={t('FORM.NAME_INPUT')}
              autoCorrect={false}
              autoCapitalize='none'
              // autoCompleteType="email"
              // textContentType="emailAddress"
              keyboardType='default'
              error={errors.name && errors.name.message}
            />
            <InputForm
              name='email'
              control={control}
              placeholder={t('FORM.EMAIL_INPUT')}
              autoCorrect={false}
              autoCapitalize='none'
              autoComplete='email'
              textContentType='emailAddress'
              keyboardType='email-address'
              error={errors.email && errors.email.message}
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
            <InputForm
              name='confirmPassword'
              control={control}
              placeholder={t('FORM.CONFIRM_PASSWORD')}
              // autoCapitalize="sentences"
              // autoCorrect={false}
              secureTextEntry
              error={errors.confirmPassword && errors.confirmPassword.message}
            />
          </Fields>
          <Button
            onPress={handleSubmit(handleRegister as SubmitHandler<FieldValues>)}
            title={t('SIGN_UP.REGISTER')}
          />
        </Form>
        <Row>
          <Text>{t('SIGN_UP.ALREADY_HAVE_ACCOUNT')} </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Link>{t('SIGN_UP.LOGIN_ACTION')}</Link>
          </TouchableOpacity>
        </Row>
      </Container>
    </TouchableWithoutFeedback>
  );
}
