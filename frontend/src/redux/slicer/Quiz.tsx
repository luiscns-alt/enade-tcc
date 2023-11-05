import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'quiz',
  initialState: {
    quiz: {},
  },
  reducers: {
    save(state, action) {
      state.quiz = {
        ...state.quiz,
        ...action.payload,
      };
    },
    clear(state) {
      return { ...state, quiz: {} };
    },
  },
});

export const { save, clear } = slice.actions;
export const selectQuiz = (state: any) => state.quizStore;

export default slice.reducer;
