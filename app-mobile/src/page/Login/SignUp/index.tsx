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
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().required('E-mail é obrigatório'),
  password: Yup.string().required('Senha é obrigatório'),
  confirmPassword: Yup.string().required('Confirme a Senha é obrigatório'),
});

export function SignUp() {
  const { navigate } = useNavigation();
  const { registerUser } = useAuth();
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
    // console.log(data);
    registerUser(data);
  }

  function handleLogin() {
    navigate('SignIn');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name='name'
              control={control}
              placeholder='Nome'
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
              placeholder='Email'
              autoCorrect={false}
              autoCapitalize='none'
              autoCompleteType='email'
              textContentType='emailAddress'
              keyboardType='email-address'
              error={errors.email && errors.email.message}
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
            <InputForm
              name='confirmPassword'
              control={control}
              placeholder='Confirme a Senha'
              // autoCapitalize="sentences"
              // autoCorrect={false}
              secureTextEntry
              error={errors.confirmPassword && errors.confirmPassword.message}
            />
          </Fields>
          <Button onPress={handleSubmit(handleRegister)} title='Cadastrar' />
        </Form>
        <Row>
          <Text>Já tem uma conta? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Link>Faça o login</Link>
          </TouchableOpacity>
        </Row>
      </Container>
    </TouchableWithoutFeedback>
  );
}
