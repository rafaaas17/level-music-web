import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  selected: null,
  total: 0,
  currentPage: 0,
  rowsPerPage: 5,
  loading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    refreshUsers: (state, action) => {
      const { items, total, page } = action.payload;
      state.users = items;
      state.total = total;
      state.currentPage = page;
      state.loading = false;
    },
    selectedUser: (state, action) => {
      state.selected = action.payload;
    },
    setLoadingUser: (state, action) => {
      state.loading = action.payload;
    },
    setPageUser: (state, action) => {
      state.currentPage = action.payload;
    },
    setRowsPerPageUser: (state, action) => {
      state.rowsPerPage = action.payload;
    },
  },
});

export const {
  refreshUsers,
  selectedUser,
  setLoadingUser,
  setPageUser,
  setRowsPerPageUser,
} = usersSlice.actions;

