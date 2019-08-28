import "regenerator-runtime/runtime";

import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';

import App from './App.js';
import rootReducer from './reducers'

const store = createStore(
    rootReducer,
    applyMiddleware(logger)
);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById("App"));
