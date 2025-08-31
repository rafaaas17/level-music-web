import { createSlice } from '@reduxjs/toolkit';
import { set } from 'react-hook-form';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated',  // 'authenticated' | 'not-authenticated' | 
                                  // 'checking' | 'first-login-password' | 
                                  // 'sending-reset-email' | 'reset-email-sent' | 
                                  // 'changing-password'
    uid: null, 
    email: null,
    firstName: null,
    lastName: null,
    phone: null,
    documentType: null,
    documentNumber: null,
    role: null,
    needs_password_change: null, 
    userStatus: null, // Activo, Inactivo
    photoURL: null, 
    token: null,
    extra_data:null,
  },
  reducers: {
    login: (state, { payload }) => {
      if (payload.userStatus === "Inactivo") {
        state.status = "not-authenticated";
        return;
      }

      state.uid = payload.uid; 
      state.email = payload.email;
      state.firstName = payload.firstName ?? null; 
      state.lastName = payload.lastName ?? null; 
      state.phone = payload.phone ?? null;
      state.documentType = payload.documentType ?? null;
      state.documentNumber = payload.documentNumber ?? null;
      state.role = payload.role;
      state.needs_password_change = payload.needs_password_change ?? null; 
      state.userStatus = payload.userStatus;
      state.photoURL = payload.photoURL; 
      state.token = payload.token;
      state.status = payload.needs_password_change ? "fisrt-login-password" : "authenticated";
      state.extra_data = payload.extra_data;
    },
    logout: (state) => {
      state.status = 'not-authenticated';
      state.uid = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.phone = null;
      state.documentType = null;
      state.documentNumber = null;
      state.role = null;
      state.needs_password_change = null; 
      state.userStatus = null;
      state.photoURL = null;
      state.token = null;
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    },
    authenticated: (state) => {
      state.status = 'authenticated';
      state.needs_password_change = false;
    },
    sendingResetEmail: (state) => {
      state.status = 'sending-reset-email';
    },
    resetEmailSent: (state) => {
      state.status = 'reset-email-sent';
    },
    changingPassword: (state) => {
      state.status = 'changing-password';
    },
    setExtraData: (state,  action ) => {
      state.extra_data = action.payload;
    }
  }
});

export const { setExtraData } = authSlice.actions;
export const { 
  login, 
  logout, 
  checkingCredentials, 
  authenticated,
  sendingResetEmail,
  resetEmailSent,
  changingPassword,
} = authSlice.actions;