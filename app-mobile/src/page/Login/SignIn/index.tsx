import React from 'react';
import * as Yup from 'yup';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
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
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../../contexts/auth';

type FormData = FieldValues & {
  username: string;
  password: string;
};

const schema = Yup.object().shape({
  username: Yup.string().required('Nome é obrigatório'),
  password: Yup.string().required('Senha é obrigatório'),
});

export function SignIn() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { signIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister: SubmitHandler<FormData> = async (form) => {
    const data = {
      login: form.username,
      password: form.password,
    };
    await signIn(data);
  };

  // function handleSign() {
  //     signIn();
  // }

  function handleRegistration() {
    navigation.navigate('Register');
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
            onPress={handleSubmit(handleRegister as SubmitHandler<FieldValues>)}
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
