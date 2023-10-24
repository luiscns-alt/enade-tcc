import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Container } from './styles';

export function InformationPanel() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container></Container>
    </TouchableWithoutFeedback>
  );
}
