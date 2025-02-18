import { createSlice } from '@reduxjs/toolkit';

const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: { 
    mode: getSystemTheme() 
  },
  reducers: {
    toggleTheme: (state) => { 
      state.mode = state.mode === 'dark' ? 'light' : 'dark'; 
    },
    setTheme: (state, action) => { 
      state.mode = action.payload; 
    }
  }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
