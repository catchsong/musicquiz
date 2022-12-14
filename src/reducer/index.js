import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import gameData from "./gameData";
<<<<<<< HEAD
import displayName from './displayname';
=======
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["gameData"]
};
>>>>>>> bdb22ad18784227f85b92e2f32cf870a1f1dce96

const rootReducer = combineReducers({
  gameData,
  displayName
});

export default persistReducer(persistConfig,rootReducer);
