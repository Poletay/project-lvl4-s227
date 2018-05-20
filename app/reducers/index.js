import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const messageAddingState = handleActions({
  [actions.addMessageRequest]() {
    return 'requested';
  },
  [actions.addMessageFailure]() {
    return 'failed';
  },
  [actions.addMessageSuccess]() {
    return 'successed';
  },
}, 'none');

const channels = handleActions({
  [actions.initChannels](state, { payload }) {
    return [...payload.channels];
  },
}, {});

const currentChannelId = handleActions({
  [actions.initChannels](state, { payload }) {
    return payload.currentChannelId;
  },
}, {});

const messages = handleActions({
  [actions.initChannels](state, { payload }) {
    return [...payload.messages];
  },
}, {});

const user = handleActions({
  [actions.initUser](state, action) {
    return action.payload;
  },
}, {});

export default combineReducers({
  form: formReducer,
  channels,
  currentChannelId,
  messages,
  messageAddingState,
  user,
});
