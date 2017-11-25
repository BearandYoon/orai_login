import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL
} from './constants';

  export function userLogin(fbToken) {
  return {
    type: USER_LOGIN,
    fbToken
  };
}

export function userLoginSuccess(payload) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload
  };
}

export function userLoginFail(error) {
  return {
    type: USER_LOGIN_FAIL,
    error
  };
}
