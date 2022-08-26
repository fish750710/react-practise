import { configureStore, combineReducers } from '@reduxjs/toolkit';
import user from './user';
import { logger } from '../middleware';

// import { createStore } from 'redux'; 已棄用

// const reducer = combineReducers({
//   user
// })
const store = configureStore({
  // reducer,
  reducer: user,
  middleware: (getMiddleware) => {
    return getMiddleware().concat(logger);
  }
})

export default store;