import { put, takeLeading, call, delay } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import { axiosClient } from 'api/axios-utils';

import { authActions } from './authSlice';
import { setLoading } from '../loading/loadingSlice';
import UserType from 'types/UserType';

type AuthResponse = AxiosResponse<{ user: UserType }>;

const login = (payload: { username: string; password: string }) => {
  return axiosClient({
    method: 'POST',
    url: '/users/login',
    data: {
      user: payload,
    },
  });
};

const register = (payload: { email: string; username: string; password: string }) => {
  return axiosClient({
    method: 'POST',
    url: '/users',
    data: {
      user: payload,
    },
  });
};

function* handleLogin(action: PayloadAction<{ username: string; password: string }>) {
  try {
    yield put(setLoading(true));
    const response: AuthResponse = yield call(login, action.payload);
    const { user } = response.data;
    const { username, email, token, bio, image } = user;
    yield put(authActions.loginSuccess({ username, email, token, bio, image }));
    yield delay(2000);
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
    const error = err as AxiosError;
    const errorData: any = error.response?.data;
    let errorMessage = 'Login failed!';
    if (errorData) {
      const { errors } = errorData;
      errorMessage = '';
      errors &&
        Object.keys(errors).forEach((key) => {
          errorMessage += ` \n${key.toLocaleUpperCase()} ${errors[key]}`;
        });
    }
    toast.error(errorMessage);
    console.error(error.message);
  }
}

function* handleLoginSuccess() {
  // yield put(setLoading(true));
  yield delay(1000);
  // yield put(setLoading(false));
}

function* handleRegister(
  action: PayloadAction<{ email: string; username: string; password: string }>
) {
  try {
    yield put(setLoading(true));
    const response: AuthResponse = yield call(register, action.payload);
    const { user } = response.data;
    const { username, email, token } = user;
    yield put(authActions.loginSuccess({ username, email, token }));
    yield delay(2000);
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
    const error = err as AxiosError;
    const errorData: any = error.response?.data;
    let errorMessage = 'Registration failed!';
    if (errorData) {
      const { errors } = errorData;
      errorMessage = '';
      errors &&
        Object.keys(errors).forEach((key) => {
          errorMessage += ` \n${key.toLocaleUpperCase()} ${errors[key]}`;
        });
    }
    toast.error(errorMessage);
    console.error(error.message);
  }
}

export default function* authSaga() {
  yield takeLeading(authActions.login.type, handleLogin);
  yield takeLeading(authActions.register.type, handleRegister);
  yield takeLeading(authActions.loginSuccess.type, handleLoginSuccess);
}
