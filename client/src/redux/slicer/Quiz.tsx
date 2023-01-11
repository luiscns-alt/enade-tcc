import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'quiz',
  initialState: {
    quiz: {},
  },
  reducers: {
    save(state: any, { payload }: any) {
      return { ...state, quiz: payload };
    },
  },
});

export const { save } = slice.actions;
export const selectQuiz = (state: any) => state.quizStore;

export default slice.reducer;
