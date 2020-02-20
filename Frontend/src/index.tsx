import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import App from './App'
import configureStore, { history } from './redux/Index'

import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);
