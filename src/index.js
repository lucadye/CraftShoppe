import React from 'react';
import ReactDOM from 'react-dom/client';

import Router from './Router';

import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

import store from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router/>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
