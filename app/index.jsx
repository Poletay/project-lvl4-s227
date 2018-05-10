import React from 'react';
// import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import gon from 'gon';
import reducers from './reducers';
import App from './components/App.jsx';
import '../assets/application.css';

const ext = window.__REDUX_DEVTOOLS_EXTENSION__; // eslint-disable-line no-underscore-dangle
const devtoolMiddleware = ext && ext();
const initialState = {
  channels: gon.channels,
};

const store = createStore(
  reducers,
  initialState,
  devtoolMiddleware,
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container'),
);
