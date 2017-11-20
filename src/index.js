import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import 'normalize.css';
import './index.css';

import store from './store'
import App from './components/app';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
  , document.getElementById('root'));
// registerServiceWorker();
