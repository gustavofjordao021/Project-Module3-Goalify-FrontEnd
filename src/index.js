import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from './context/index';

import App from './App';
import { BrowserRouter } from 'react-router-dom';

import '../src/assets/plugins/nucleo/css/nucleo.css'

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
