import { configureStore } from '@reduxjs/toolkit';

import questionReducer from './slicer/Question';
import quizReducer from './slicer/Quiz';

export default configureStore({
  reducer: {
    quizStore: quizReducer,
    questionStore: questionReducer,
  },
});
