import {combineReducers} from 'redux'
import userReducer from './reducers/userReducer'
import productReducer from './reducers/productReducer'
import cartReducer from './reducers/cartReducer'
import orderReducer from './reducers/orderReducer'



const rootReducer = combineReducers({
    userState: userReducer,
    productState:productReducer,
    cartState:cartReducer,
    orderState:orderReducer
  });
  
  export default rootReducer;