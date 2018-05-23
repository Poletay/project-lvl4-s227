import { createAction } from 'redux-actions';
import axios from 'axios';

import routes from '../routes';

export const initChannels = createAction('INIT_CHANNELS');
export const initUser = createAction('INIT_USER');
export const initSocket = createAction('INIT_SOCKET');

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = (message, currentChannelId) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const url = routes.addMessageUrl(currentChannelId);
    await axios.post(url, { data: { attributes: { text: message.text } } });
    dispatch(addMessageSuccess());
  } catch (e) {
    dispatch(addMessageFailure());
  }
};
