import store from '@/redux/store';
import { Provider } from 'react-redux';
import QuestionnairesData from './QuestionnairesData';

const Questionnaires = () => {
  return (
    <Provider store={store}>
      <QuestionnairesData />
    </Provider>
  );
};

export default Questionnaires;
