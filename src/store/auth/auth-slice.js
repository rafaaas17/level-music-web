import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated', // 'authenticated' | 'not-authenticated' | 'checking'
    uid: null, 
    email: null,
    firstName: null,
    lastName: null,
    phone: null,
    documentType: null,
    documentNumber: null,
    role: null,
    userStatus: null, // Activo, Inactivo
    photoURL: null, 
    errorMessage: null,
    token: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.uid = payload.uid; 
      state.email = payload.email;
      state.firstName = payload.firstName ?? null; 
      state.lastName = payload.lastName ?? null; 
      state.phone = payload.phone ?? null;
      state.documentType = payload.documentType ?? null;
      state.documentNumber = payload.documentNumber ?? null;
      state.role = payload.role;
      state.userStatus = payload.userStatus;
      state.photoURL = payload.photoURL; 
      state.errorMessage = null;
      state.token = payload.token;
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.uid = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.phone = null;
      state.documentType = null;
      state.documentNumber = null;
      state.role = null;
      state.userStatus = null;
      state.photoURL = null;
      state.errorMessage = payload?.errorMessage ?? null;
      state.token = null;
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    }
  }
});

export const { 
  login, 
  logout, 
  checkingCredentials, 
  clearErrorMessage 
} = authSlice.actions;