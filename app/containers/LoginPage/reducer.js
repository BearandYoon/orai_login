import { fromJS } from 'immutable';

import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: true,
  changingStatus: false,
  loadError: '',
  userToken: ''
})
  .set('auth', {});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return state
        .set('loading', true)
        .set('loadError', '')
        .set('userToken', '');
    case USER_LOGIN_FAIL:
      return state
        .set('loading', false)
        .set('loadError', action.error);
    case USER_LOGIN_SUCCESS:
      return state
        .set('loading', false)
        .set('userToken', action.payload);
    default:
      return state;
  }
}

export default loginReducer;
