import React from 'react';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import { createRoot} from 'react-dom/client';

import rootReducer from "./reducer";





const store = createStore(rootReducer);


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

//reportWebVitals();