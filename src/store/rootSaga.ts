import { all } from 'redux-saga/effects';

import authSaga from './features/auth/authSaga';
// import productsSaga from '../features/products/productsSaga';

export default function* rootSaga() {
  yield all([authSaga()]);
}
