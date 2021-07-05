import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from "redux-thunk"

import {productsReducer} from "./reducers/productReducers"; //it needs to be in {} bc/ it is not a default export it is a NAME EXPORT === NO DEFAULT

const initialState = {};//define initial state
//IF THIS EXISTS WE USE IT OR WE USE DEFAULT COMPOSE FUNCTION
//THIS SENDS TO REDUX DEV TOOL AND MONITOR ALL ACTIONS
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;//COMPOSE ALL MIDDLEWARE

//store accepts multiple params
//we combine all reducers together
const store = createStore(
  combineReducers({
    products: productsReducer,
  }),
  initialState,
  //we have to use redux-thunk. bc inside of our actions we are sending async request to server to get data so WE USE THUNK TO HANDLE IT
  //WE COMPOSE ALL MIDDLEWARES TOGETHER
  composeEnhancer(applyMiddleware(thunk))
)

export default store;
