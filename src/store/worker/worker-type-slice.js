import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workerTypes: [],
  selected: null,
  total: 0,
  currentPage: 0,
  rowsPerPage: 5,
  loading: false,
};

export const workerTypesSlice = createSlice({
  name: 'workerTypes',
  initialState,
  reducers: {
    refreshWorkerTypes: (state, action) => {
      const { items, total, page } = action.payload;
      state.workerTypes = items; 
      state.total = total;
      state.currentPage = page;
      state.loading = false; 
    },
    selectedWorkerType: (state, action) => {
      state.selected = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
    },
  },
});

export const {
  refreshWorkerTypes,
  selectedWorkerType,
  setLoading,
  setPage,
  setRowsPerPage,
} = workerTypesSlice.actions;