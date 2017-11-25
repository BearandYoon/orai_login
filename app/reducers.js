/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import Rebase from 're-base';
// import firebase from 'firebase/app';
// import * from 'firebase/auth';
// import * from 'firebase/database';

const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

import { firebaseConfig } from 'shared/constants';

import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

// Initial fireBase state
const fireBaseInitialState = fromJS({
  firebase: {},
});

let base = null;

function fireBaseReducer(state = fireBaseInitialState, action) {
  if (!base) {
    base = Rebase.createClass(firebaseConfig);
  }
  return state
    .set('firebase', base);
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    global: globalReducer,
    language: languageProviderReducer,
    firebase: fireBaseReducer,
    ...asyncReducers,
  });
}
