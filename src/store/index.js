import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import userReducer from './userSlice';

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const reducers = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
});

export default store;

export const getState = store.getState;
