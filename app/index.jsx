import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import socket from 'socket.io-client';
import _ from 'lodash';
import gon from 'gon'; // eslint-disable-line
import 'bootstrap/dist/css/bootstrap.min.css';
import reducers from './reducers';
import UserContext from './components/UserContext';
import App from './components/App';
import {
  initChannels,
  addNewMessage,
  addNewChannel,
  removeChannel,
  renameChannel,
} from './actions';

const ext = window.__REDUX_DEVTOOLS_EXTENSION__; // eslint-disable-line no-underscore-dangle
const devtoolMiddleware = ext && ext();

const middlewareFuncs = _.compact([
  applyMiddleware(thunk),
  devtoolMiddleware,
]);

const store = createStore(
  reducers,
  compose(...middlewareFuncs),
);

const io = socket();
io.on('newMessage', (data) => {
  store.dispatch(addNewMessage(data));
});
io.on('newChannel', (data) => {
  store.dispatch(addNewChannel(data));
});
io.on('removeChannel', (data) => {
  store.dispatch(removeChannel(data));
});
io.on('renameChannel', (data) => {
  store.dispatch(renameChannel(data));
});

store.dispatch(initChannels(gon));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container'),
);
