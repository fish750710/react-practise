import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { logger } from '../middleware';

import user from './user';
import auth from './auth';
import cakeSlice from './slices/cakeSlice';
import coffeeSlice from './slices/coffeeSlice';
import assetsSlice from './slices/assetsSlice';

import { pokemonApi } from './api/pokemonApi';

const store = configureStore({
  reducer: { 
    user,
    auth,
    cake: cakeSlice,
    coffee: coffeeSlice,
    assets: assetsSlice,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  // middleware: (getMiddleware) => {
  //   return getMiddleware().concat(logger);
  // }
  // 啟用 api 緩存
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware).concat(logger),
})

setupListeners(store.dispatch)

export default store;


// ******************************************
// 舊寫法
// import { createStore } from 'redux'; // 已棄用

// // types
// const COFFEE_ORDERED = 'COFFEE_ORDERED';
// // Actions
// const orderCoffee = num => {
//   return {
//     type: COFFEE_ORDERED,
//     payload: num
//   }
// }
// // Reducers
// const initialState = {
//   numOfCoffee: 10
// }
// const orderReducer = (state=initialState, action) => {
//   switch(action.type) {
//     case COFFEE_ORDERED:
//       return {...state, numOfCoffee: state.numOfCoffee - 1}
//     default:
//       return state;
//   }
// }
// const reducers = combineReducers({
//   orderReducer
// })

// const store2 = createStore(orderReducer);
// console.log(store2.getState())
// store2.dispatch(orderCoffee(1))
// // export default store2;
