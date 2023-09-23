import Questions from '@/pages/Table/Questions';
import store from '@/redux/store';
import { Provider } from 'react-redux';

const Questionnaires = () => {
  return (
    <Provider store={store}>
      <Questions />
    </Provider>
  );
};

export default Questionnaires;
