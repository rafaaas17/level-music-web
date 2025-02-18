import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-authenticated", // 'checking' | 'authenticated' | 'not-authenticated'
    user: null,
    token: null,
    errorMessage: null,
  },
  reducers: {
    checkingCredentials: (state) => {
      state.status = "checking"; // Estado de carga
    },
    login: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload.user;
      state.token = payload.token;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = null;
      state.token = null;
      state.errorMessage = payload?.errorMessage || null;
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
