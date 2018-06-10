import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

export const doHttpRequestRequest = createAction('DO_HTTP_REQUEST_REQUEST');
export const doHttpRequestSuccess = createAction('DO_HTTP_REQUEST_SUCCESS');
export const doHttpRequestFailure = createAction('DO_HTTP_REQUEST_FAILURE');

export const addNewMessage = createAction('ADD_MESSAGE');
export const addNewChannel = createAction('ADD_CHANNEL');
export const changeChannel = createAction('CHANGE_CHANNEL');
export const removeChannel = createAction('REMOVE_CHANNEL');
export const renameChannel = createAction('RENAME_CHANNEL');

export const deleteChannel = ({ channelId }) => async (dispatch) => {
  const requestName = 'channelDeletingState';
  dispatch(doHttpRequestRequest({ requestName }));
  try {
    const url = routes.getDeleteChannelUrl(channelId);

    await axios.delete(url, {});
    dispatch(doHttpRequestSuccess({ requestName }));
  } catch (e) {
    dispatch(doHttpRequestFailure({ requestName }));
    console.log(`Error for deleting channel. ${e.message}`); // eslint-disable-line no-console
  }
};

export const changeChannelName = ({ text }, { channelId }) => async (dispatch) => {
  const requestName = 'channelRenamingState';
  dispatch(doHttpRequestRequest({ requestName }));
  try {
    const url = routes.getRenameChannelUrl(channelId);

    const newChannelData = {
      data: {
        attributes: {
          name: text,
        },
      },
    };

    await axios.patch(url, newChannelData);
    dispatch(doHttpRequestSuccess({ requestName }));
  } catch (e) {
    dispatch(doHttpRequestFailure({ requestName }));
    console.log(`Error for renaming channel. ${e.message}`); // eslint-disable-line no-console
  }
};


export const addChannel = ({ text }) => async (dispatch) => {
  const requestName = 'channelAddingState';
  dispatch(doHttpRequestRequest({ requestName }));
  try {
    const url = routes.getAddChannelUrl();

    const newChannelData = {
      data: {
        attributes: {
          name: text,
        },
      },
    };

    await axios.post(url, newChannelData);
    dispatch(doHttpRequestSuccess({ requestName }));
  } catch (e) {
    dispatch(doHttpRequestFailure({ requestName }));
    console.log(`Error for adding new channel. ${e.message}`); // eslint-disable-line no-console
  }
};

export const addMessage = ({ text }, currentChannelId, userName) => async (dispatch) => {
  const requestName = 'messageSendingState';
  dispatch(doHttpRequestRequest({ requestName }));
  try {
    const url = routes.getAddMessageUrl(currentChannelId);
    const newMessageData = {
      data: {
        attributes: {
          text,
          autor: userName,
        },
      },
    };

    await axios.post(url, newMessageData);
    dispatch(doHttpRequestSuccess({ requestName }));
  } catch (e) {
    dispatch(doHttpRequestFailure({ requestName }));
    console.log(`Error for sending message. ${e.message}`); // eslint-disable-line no-console
  }
};
