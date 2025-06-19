// store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const getInitialLoginState = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  return false;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: getInitialLoginState(),
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'false');
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
