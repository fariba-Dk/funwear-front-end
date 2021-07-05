
import { FETCH_PRODUCTS } from '../types';

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch('/api/products');
  const data = await res.json();
  console.log(data);
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};// import { FETCH_PRODUCTS } from '../types'

// //Get DATA from SERVER
// export const fetchProducts = () => async (dispatch) => {
//   const res = await fetch('/api/products')
//   const data = await res.json();//this is a promise
//   console.log(data)
//   dispatch({ //dispatch action
//     type: FETCH_PRODUCTS,
//     payload: data,//res.data
//   })
// }
//DISPATCH IS AN {} OBJ
//IT ACCEPTS 2 VALUES: TYPE && PAYLOAD

 //we export fetchActions this function accepts NO PARAMS bc we are getting a list of all products NOT FILTER

 //it accepts a dispatch
  //we dispatch action
  //FIRST: get data from server

    //dispatch accepts object with 2 value 1. type 2. payload
  //lest get the rest of data and dipatch is the ACTION

