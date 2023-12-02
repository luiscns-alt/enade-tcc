import QuestionsData from '@/pages/Table/QuestionsData';
import store from '@/redux/store';
import { Provider } from 'react-redux';

const Table = () => {
  return (
    <Provider store={store}>
      <QuestionsData />
    </Provider>
  );
};

export default Table;
