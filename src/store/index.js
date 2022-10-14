import { configureStore, combineReducers } from '@reduxjs/toolkit';
import user from './user';
import auth from './auth';
import { logger } from '../middleware';

// import { createStore } from 'redux'; 已棄用

// const reducer = combineReducers({
//   user
// })
const store = configureStore({
  // reducer,
  reducer: { user, auth },
  middleware: (getMiddleware) => {
    return getMiddleware().concat(logger);
  }
})

export default store;