import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import Cookie from 'js-cookie';
import Faker from 'faker';
import thunk from 'redux-thunk';
import socket from 'socket.io-client';
import _ from 'lodash';
import gon from 'gon';
import 'bootstrap/dist/css/bootstrap.min.css';
import reducers from './reducers';
import { initChannels, initUser, initSocket, newMessage } from './actions';
import App from './components/App.jsx';

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

const getUserName = () => {
  const name = Cookie.get('userName');
  if (name) {
    return name;
  }
  Cookie.set('userName', Faker.name.findName());
  return Cookie.get('userName');
};

const getSocket = () => {
  const io = socket();
  io.on('newMessage', (data) => {
    store.dispatch(newMessage(data));
  });
  return io;
};

store.dispatch(initChannels(gon));
store.dispatch(initUser(getUserName()));
store.dispatch(initSocket(getSocket()));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container'),
);
