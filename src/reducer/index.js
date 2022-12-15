import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import gameData from "./gameData";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["gameData"]
};

const rootReducer = combineReducers({
  gameData
  
});

export default persistReducer(persistConfig,rootReducer);
