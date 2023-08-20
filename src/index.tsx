import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'

import './assets/css/index.css';
import App from './App';
import { store } from './store';
import Modal from './components/Modal';

const root = ReactDOM.createRoot(
  document.getElementById('app-root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Modal />
    </Provider>
  </React.StrictMode>
);