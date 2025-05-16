import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  eventType: [],
  selected: null,
  total: 0,
  currentPage: 0,
  rowsPerPage: 5,
  loading: false,
};

export const eventTypeSlice = createSlice({
  name: 'eventType',
  initialState,
  reducers: {
    refreshEventType: (state, action) => {
      const { items, total, page } = action.payload;
      state.eventType = items; 
      state.total = total;
      state.currentPage = page;
      state.loading = false; 
    },
    selectedEventType: (state, action) => {
      state.selected = action.payload;
    },
    setLoadingEventType: (state, action) => {
      state.loading = action.payload;
    },
    setPageEventType: (state, action) => {
      state.currentPage = action.payload;
    },
    setRowsPerPageEventType: (state, action) => {
      state.rowsPerPage = action.payload;
    },
  },
});

export const {
  refreshEventType,
  selectedEventType,
  setLoadingEventType,
  setPageEventType,
  setRowsPerPageEventType,
} = eventTypeSlice.actions;