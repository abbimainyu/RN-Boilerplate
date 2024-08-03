// reducers/index.ts
import {combineReducers} from '@reduxjs/toolkit';
import exampleReducer from './nfcList';

const rootReducer = combineReducers({
  list: exampleReducer,
});

export default rootReducer;
