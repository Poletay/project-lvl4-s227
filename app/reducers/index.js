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

const channelAddingState = handleActions({
  [actions.addChannelRequest]() {
    return 'requested';
  },
  [actions.addChannelFailure]() {
    return 'failed';
  },
  [actions.addChannelSuccess]() {
    return 'successed';
  },
}, 'none');


const channels = handleActions({
  [actions.initChannels](state, { payload }) {
    return [...payload.channels];
  },
  [actions.newChannel](state, { payload: { data: { attributes } } }) {
    return [...state, attributes];
  },
  [actions.removeChannel](state, { payload: { data: { id } } }) {
    return state.filter(c => (c.id !== id));
  },
}, {});

const currentChannelId = handleActions({
  [actions.initChannels](state, { payload }) {
    return payload.currentChannelId;
  },
  [actions.changeChannel](state, { payload }) {
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
  channelAddingState,
  currentChannelId,
  messages,
  messageSendingState,
  user,
  socket,
});
