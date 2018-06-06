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
  [actions.addNewChannel](state, { payload: { data: { attributes } } }) {
    return {
      ...state,
      channelsList: [
        ...state.channelsList,
        attributes,
      ],
    };
  },
  [actions.removeChannel](state, { payload: { data: { id } } }) {
    return {
      ...state,
      currentChannelId:
        state.currentChannelId === id ?
          state.defaultChannelId :
          state.currentChannelId,
      channelsList: state.filter(c => (c.id !== id)),
    };
  },
  [actions.changeChannel](state, { payload: { currentChannelId } }) {
    return {
      ...state,
      currentChannelId,
    };
  },
  [actions.renameChannel](state, { payload: { data: { attributes } } }) {
    const newState = [...state];
    const channel = newState.channelsList.find(c => c.id === attributes.id);
    channel.name = attributes.name;
    return newState;
  },
}, {});

const messages = handleActions({
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
  messages,
  requestsState,
});
