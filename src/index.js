import React from 'react';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createRoot } from 'react-dom/client';

let store = createStore(() => {
  return [
    {ans : 'none'}
  ]
});
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  
  <BrowserRouter>
    <Provider store={ store }>
      <App />
    </Provider>
  </BrowserRouter>
);

//reportWebVitals();