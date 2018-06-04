import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const requestsState = handleActions({
  [actions.sendMessageRequest](state) {
    return { ...state, messageSendingState: 'requested' };
  },
  [actions.sendMessageFailure](state) {
    return { ...state, messageSendingState: 'failed' };
  },
  [actions.sendMessageSuccess](state) {
    return { ...state, messageSendingState: 'successed' };
  },
  [actions.addChannelRequest](state) {
    return { ...state, channelAddingState: 'requested' };
  },
  [actions.addChannelFailure](state) {
    return { ...state, channelAddingState: 'failed' };
  },
  [actions.addChannelSuccess](state) {
    return { ...state, channelAddingState: 'successed' };
  },
  [actions.deleteChannelRequest](state) {
    return { ...state, channelDeletingState: 'requested' };
  },
  [actions.deleteChannelFailure](state) {
    return { ...state, channelDeletingState: 'failed' };
  },
  [actions.deleteChannelSuccess](state) {
    return { ...state, channelDeletingState: 'successed' };
  },
  [actions.renameChannelRequest](state) {
    return { ...state, channelRenamingState: 'requested' };
  },
  [actions.renameChannelFailure](state) {
    return { ...state, channelRenamingState: 'failed' };
  },
  [actions.renameChannelSuccess](state) {
    return { ...state, channelRenamingState: 'successed' };
  },
}, {
  messageSendingState: 'none',
  channelAddingState: 'none',
  channelDeletingState: 'none',
  channelRenamingState: 'none',
});

const channels = handleActions({
  [actions.initChannels](state, { payload }) {
    return [...payload.channels];
  },
  [actions.addNewChannel](state, { payload: { data: { attributes } } }) {
    return [...state, attributes];
  },
  [actions.removeChannel](state, { payload: { data: { id } } }) {
    return state.filter(c => (c.id !== id));
  },
  [actions.renameChannel](state, { payload: { data: { attributes } } }) {
    const newState = [...state];
    const channel = newState.find(c => c.id === attributes.id);
    channel.name = attributes.name;
    return newState;
  },
}, {});

const currentChannelId = handleActions({
  [actions.initChannels](state, { payload }) {
    return payload.currentChannelId;
  },
  [actions.changeChannel](state, { payload }) {
    return payload.currentChannelId;
  },
  [actions.removeChannel](state, { payload: { data: { id } } }) {
    const defaultCurrentChannelId = 1;
    return state === id ? defaultCurrentChannelId : state;
  },
}, {});

const messages = handleActions({
  [actions.initChannels](state, { payload }) {
    return [...payload.messages];
  },
  [actions.addNewMessage](state, { payload: { data: { attributes } } }) {
    return [...state, attributes];
  },
  [actions.removeChannel](state, { payload: { data: { id } } }) {
    return state.filter(m => m.channelId !== id);
  },
}, {});

export default combineReducers({
  form: formReducer,
  channels,
  currentChannelId,
  messages,
  requestsState,
});
