import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  snackbar: {
    open: false,
    message: '',
    type: 'success', 
  },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    closeSnackbar: (state) => {
      state.snackbar.open = false;
    },
  },
});

export const { showSnackbar, closeSnackbar } = uiSlice.actions;
