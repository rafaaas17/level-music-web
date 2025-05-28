import { configureStore } from '@reduxjs/toolkit';
import { 
  authSlice,
  themeSlice,
  eventQuotationSlice,
  usersSlice,
  workerTypesSlice,
  providerSlice,
  serviceTypeSlice,
  uiSlice,
  serviceSlice,
  eventTypeSlice,
  resourceSlice,
  maintenanceSlice
} from './';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    theme: themeSlice.reducer,
    events: eventQuotationSlice.reducer,
    eventType: eventTypeSlice.reducer,
    users: usersSlice.reducer,
    workerTypes: workerTypesSlice.reducer,
    ui: uiSlice.reducer,
    provider: providerSlice.reducer,
    service: serviceSlice.reducer,
    serviceType: serviceTypeSlice.reducer,
    resource: resourceSlice.reducer,
    maintenance: maintenanceSlice.reducer,
  },
});
