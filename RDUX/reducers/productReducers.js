// import {FETCH_PRODUCTS} from '../types'

// export const productsReducer = (state = {}, action) => {
//   switch(action.type){//if action.type is fetch-products =>
//     case FETCH_PRODUCTS:
//       return {items: action.payload}//new state = actioin.payload
//       default:
//         return state;//or return the initial state
//   }
// }
import { FETCH_PRODUCTS } from '../types';

export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { items: action.payload };
    default:
      return state;
  }
};
