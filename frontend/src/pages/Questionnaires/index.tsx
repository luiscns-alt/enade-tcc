import QuestionnairesData from '@/components/QuestionnairesData';
import store from '@/redux/store';
import { Provider } from 'react-redux';

const Questionnaires = () => {
  return (
    <Provider store={store}>
      <QuestionnairesData />
    </Provider>
  );
};

export default Questionnaires;
