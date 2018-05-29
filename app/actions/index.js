import { createAction } from 'redux-actions';
import axios from 'axios';

import routes from '../routes';

export const initChannels = createAction('INIT_CHANNELS');
export const initUser = createAction('INIT_USER');
export const initSocket = createAction('INIT_SOCKET');

export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

export const newMessage = createAction('NEW_MESSAGE');

export const addMessage = (message, currentChannelId, userName) => async (dispatch) => {
  dispatch(sendMessageRequest());
  try {
    const url = routes.addMessageUrl(currentChannelId);
    await axios.post(url, { data: { attributes: { text: message.text, autor: userName } } });
    dispatch(sendMessageSuccess());
  } catch (e) {
    dispatch(sendMessageFailure());
    console.log(`Error for sending message. ${e.message}`); // eslint-disable-line no-console
  }
};
