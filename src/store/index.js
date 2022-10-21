import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { logger } from '../middleware';

import user from './user';
import auth from './auth';
import cakeReducer from './slices/cakeSlice';
import coffeeReducer from './slices/coffeeSlice';
import assetsReducer from './slices/assetsSlice';

const store = configureStore({
  reducer: { 
    user,
    auth,
    cake: cakeReducer,
    coffee: coffeeReducer,
    assets: assetsReducer,
  },
  middleware: (getMiddleware) => {
    return getMiddleware().concat(logger);
  }
})

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
