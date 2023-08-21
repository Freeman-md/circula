import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'

import './assets/css/index.css';
import App from './App';
import { store } from './store';
import Snackbar from './components/Snackbar';

const root = ReactDOM.createRoot(
  document.getElementById('app-root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Snackbar />
    </Provider>
  </React.StrictMode>
);