import { combineReducers } from 'redux';
import gameData from "./gameData";
import displayName from './displayname';

const rootReducer = combineReducers({
  gameData,
  displayName
});

export default rootReducer;
