import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resources: [],
  selected: null,
  total: 0,
  currentPage: 0,
  rowsPerPage: 5,
  loading: false,
};

export const resourceSlice = createSlice({
  name: "resource",
  initialState,
  reducers: {
    refreshResource: (state, action) => {
      const { items, total, page } = action.payload;
      state.resources = items;
      state.total = total;
      state.currentPage = page;
      state.loading = false;
    },
    selectedResource: (state, action) => {
      state.selected = action.payload;
    },
    setLoadingResource: (state, action) => {
      state.loading = action.payload;
    },
    setPageResource: (state, action) => {
      state.currentPage = action.payload;
    },
    setRowsPerPageResource: (state, action) => {
      state.rowsPerPage = action.payload;
    },
  },
});

export const {
  refreshResource,
  selectedResource,
  setLoadingResource,
  setPageResource,
  setRowsPerPageResource,
} = resourceSlice.actions;
