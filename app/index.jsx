import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import Cookie from 'js-cookie';
import Faker from 'faker';
import thunk from 'redux-thunk';
import socket from 'socket.io-client';
import gon from 'gon';
import 'bootstrap/dist/css/bootstrap.min.css';
import reducers from './reducers';
import { initChannels, initUser, initSocket } from './actions';
import App from './components/App.jsx';

const ext = window.__REDUX_DEVTOOLS_EXTENSION__; // eslint-disable-line no-underscore-dangle
const devtoolMiddleware = ext && ext();

const getUserName = () => {
  const name = Cookie.get('userName');
  if (name) {
    return name;
  }
  Cookie.set('userName', Faker.name.findName());
  return Cookie.get('userName');
};

const getSocket = () => socket('http://localhost:4000');

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);

store.dispatch(initChannels(gon));
store.dispatch(initUser(getUserName()));
store.dispatch(initSocket(getSocket()));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container'),
);
