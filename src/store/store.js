import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { themeSlice } from './theme';
import { eventQuotationSlice } from './events';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    theme: themeSlice.reducer,
    events: eventQuotationSlice.reducer,
  },
});
