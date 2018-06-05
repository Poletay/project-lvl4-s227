import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const requestsState = handleActions({
  [actions.makeRequest](state, { payload: { requestName } }) {
    return { ...state, [requestName]: 'requested' };
  },
  [actions.makeFailure](state, { payload: { requestName } }) {
    return { ...state, [requestName]: 'failed' };
  },
  [actions.makeSuccess](state, { payload: { requestName } }) {
    return { ...state, [requestName]: 'successed' };
  },
}, {});

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
