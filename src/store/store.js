import { configureStore } from '@reduxjs/toolkit';
import { 
  authSlice,
  themeSlice,
  eventQuotationSlice,
  usersSlice
} from './';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    theme: themeSlice.reducer,
    events: eventQuotationSlice.reducer,
    users: usersSlice.reducer,
  },
});
