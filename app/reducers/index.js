import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const channels = handleActions({
  [actions.initChannels](state, { payload }) {
    return [...payload];
  },
}, {});
const user = handleActions({
  [actions.initUser](state, action) {
    return [...action.payload];
  },
}, {});

export default combineReducers({
  form: formReducer,
  channels,
  user,
});
