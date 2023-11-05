import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'question',
  initialState: {
    question: {},
  },
  reducers: {
    save(state: any, { payload }: any) {
      return { ...state, question: payload };
    },
  },
});

export const { save } = slice.actions;
export const selectQuestion = (state: any) => state.questionStore;

export default slice.reducer;
