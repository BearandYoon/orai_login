
import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { requestBackend } from 'utils/request';

import { userLoginSuccess, userLoginFail } from './actions';
import { USER_LOGIN } from './constants';

export function* userLogin(data) {
  try {
    const items = yield call(requestBackend, `/login`, {
      method: 'GET'
    });
    yield put(userLoginSuccess(items));
  } catch (err) {
    yield put(userLoginFail(err));
  }
}

export function* userLoginWatcher() {
  const watcher = yield takeLatest(USER_LOGIN, userLogin);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  userLoginWatcher
];
