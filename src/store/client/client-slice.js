import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clients: [],
  selected: null,
  total: 0,
  currentPage: 0,
  rowsPerPage: 5,
  loading: false,
};

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    refreshClients: (state, action) => {
      const { items, total, page } = action.payload;
      state.clients = items;
      state.total = total;
      state.currentPage = page;
      state.loading = false;
    },
    selectedClient: (state, action) => {
      state.selected = action.payload;
    },
    setLoadingClient: (state, action) => {
      state.loading = action.payload;
    },
    setPageClient: (state, action) => {
      state.currentPage = action.payload;
    },
    setRowsPerPageClient: (state, action) => {
      state.rowsPerPage = action.payload;
    },
  },
});

export const {
  refreshClients,
  selectedClient,
  setLoadingClient,
  setPageClient,
  setRowsPerPageClient,
} = clientSlice.actions;