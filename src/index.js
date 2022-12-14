import React from 'react';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { createRoot } from 'react-dom/client';

import rootReducer from "./reducer";





const store = createStore(rootReducer);
const persistor = persistStore(store);


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <Provider store={ store }>
    <PersistGate loading={null} persistor ={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

//reportWebVitals();