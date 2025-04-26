import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selected: null,
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.users.push(action.payload);
    },
    refreshUsers: (state, action) => {
      state.users = action.payload;
    },
    updateUser: (state, action) => {
      state.users = state.users.map((user) =>
        user._id === action.payload._id ? { ...action.payload } : user
      );
      state.active = null;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
      state.selected = null;
    },
    selectedUser: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const {
  selectedUser,
  createUser,
  deleteUser,
  updateUser,
  refreshUsers,
} = usersSlice.actions;

