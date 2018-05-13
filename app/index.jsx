import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Cookie from 'js-cookie';
import Faker from 'faker';
import gon from 'gon';
import reducers from './reducers';
import { initChannels, initUser } from './actions';
import App from './components/App.jsx';
import '../assets/application.css';

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

const store = createStore(
  reducers,
  devtoolMiddleware,
);

store.dispatch(initChannels(gon.channels));
store.dispatch(initUser(getUserName()));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container'),
);
