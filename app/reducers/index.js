import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
// import * as actions from '../actions';

const channels = handleActions({}, {});

export default combineReducers({
  form: formReducer,
  channels,
});
