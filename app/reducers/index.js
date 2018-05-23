import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const messageSendingState = handleActions({
  [actions.sendMessageRequest]() {
    return 'requested';
  },
  [actions.sendMessageFailure]() {
    return 'failed';
  },
  [actions.sendMessageSuccess]() {
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
  [actions.newMessage](state, { payload: { data: { attributes } } }) {
    return [...state, attributes];
  },
}, {});

const user = handleActions({
  [actions.initUser](state, action) {
    return action.payload;
  },
}, {});

const socket = handleActions({
  [actions.initSocket](state, action) {
    return action.payload;
  },
}, {});

export default combineReducers({
  form: formReducer,
  channels,
  currentChannelId,
  messages,
  messageSendingState,
  user,
  socket,
});
