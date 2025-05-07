import { configureStore } from '@reduxjs/toolkit';
import { 
  authSlice,
  themeSlice,
  eventQuotationSlice,
  usersSlice,
  workerTypesSlice,
  providerSlice,
  serviceTypeSlice,
  uiSlice
} from './';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    theme: themeSlice.reducer,
    events: eventQuotationSlice.reducer,
    users: usersSlice.reducer,
    workerTypes: workerTypesSlice.reducer,
    ui: uiSlice.reducer,
    provider: providerSlice.reducer,
    serviceType: serviceTypeSlice.reducer
  },
});
