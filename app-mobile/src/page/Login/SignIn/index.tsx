import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import { Button } from '../../../components/Button';
import { InputForm } from '../../../components/Form/InputForm';

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
import { useAuth } from '../../../contexts/auth';

interface FormData {
  username: string;
  password: string;
}

const schema = Yup.object().shape({
  username: Yup.string().required('Nome é obrigatório'),
  password: Yup.string().required('Senha é obrigatório'),
});

export function SignIn() {
  const { navigate } = useNavigation();
  const { signIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleRegister(form: FormData) {
    const data = {
      username: form.username,
      password: form.password,
    };
    // console.log(data);
    signIn(data);
  }

  // function handleSign() {
  //     signIn();
  // }

  function handleRegistration() {
    navigate('Register');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Login</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name='username'
              control={control}
              placeholder='Email'
              // autoCapitalize="sentences"
              autoCorrect={false}
              autoCapitalize='none'
              autoCompleteType='email'
              textContentType='emailAddress'
              keyboardType='email-address'
              error={errors.username && errors.username.message}
            />
            <InputForm
              name='password'
              control={control}
              placeholder='Senha'
              // autoCapitalize="sentences"
              // autoCorrect={false}
              secureTextEntry
              error={errors.password && errors.password.message}
            />
          </Fields>
          <Button
            onPress={handleSubmit(handleRegister)}
            // onPress={handleSign}
            title='Login'
          />
        </Form>
        <Row>
          <Text>Não tem uma conta? </Text>
          <TouchableOpacity onPress={handleRegistration}>
            <Link>Cadastrar</Link>
          </TouchableOpacity>
        </Row>
      </Container>
    </TouchableWithoutFeedback>
  );
}
