import { createSlice } from '@reduxjs/toolkit';

export const stepperSlice = createSlice({
  name: 'stepper',
  initialState: {
    currentPage: 0
  },
  reducers: {
    nextPage(state) {
      state.currentPage += 1;
    },
    previousPage(state) {
      state.currentPage = Math.max(0, state.currentPage - 1);
    },
    goToPage(state, action) {
      state.currentPage = action.payload;
    }
  }
});

export const { 
  nextPage, 
  previousPage, 
  goToPage 
} = stepperSlice.actions;
