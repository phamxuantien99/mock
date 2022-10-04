import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    username: '',
    email: '',
    token: '',
    image: '' as string | null,
    bio: '',
  },
  reducers: {
    login: (state, action) => {},
    loginFailed: (state) => {
      state.isAuthenticated = false;
      state.token = '';
      localStorage.removeItem('jwt');
      toast.error('Failed to login!');
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.image = action.payload.image;
      state.bio = action.payload.bio;
      localStorage.setItem('jwt', action.payload.token);
    },

    register: (state, action) => {},

    logout: (state) => {
      state.isAuthenticated = false;
      state.token = '';
      console.log('removejwt');
      localStorage.removeItem('jwt');
      clearTimeout(JSON.parse(localStorage.getItem('autoLogoutTimer')!));
      localStorage.removeItem('autoLogoutTimer');
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
