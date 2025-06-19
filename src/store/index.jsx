import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileSlice';
import authReducer from './authSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});
