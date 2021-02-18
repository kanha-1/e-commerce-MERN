import axios from 'axios'
import {TOGGLE_IS_CART_FETCHING, SET_CART} from '../actionTypes'


export const addtoCart = (productdata) => async (dispatch) => {

    try {
      dispatch({type:TOGGLE_IS_CART_FETCHING})
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/cart`,productdata,{
            headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
          }
      );
      if(data.success){
        alert(data.message)
      }
      else{
          alert(data.message)
      }
    } catch (err) {
      alert(err.message)
      console.error(err);
    }
    finally{
      dispatch({type:TOGGLE_IS_CART_FETCHING})
    }
  };

  export const getCart = () => async (dispatch) => {

    try {
      dispatch({type:TOGGLE_IS_CART_FETCHING})
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cart/be`,{
            headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
          }
      );
      if(data.success){
        dispatch({type:SET_CART, payload: data.cart})
      }
      else{
          alert(data.message)
      }
    } catch (err) {
      alert(err.message)
      console.error(err);
    }
    finally{
      dispatch({type:TOGGLE_IS_CART_FETCHING})
    }
  };

  export const setQuantity = (dataProduct, window) => async (dispatch) => {

    try {
      dispatch({type:TOGGLE_IS_CART_FETCHING})
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/cart?quantity=${dataProduct.quantity}`,{productId:dataProduct.id},{
            headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
          }
      );
      if(data.success){
        
      }
      else{
          alert(data.error.message)
      }
    } catch (err) {
      alert(err.message)
      console.error(err);
    }
    finally{
      dispatch({type:TOGGLE_IS_CART_FETCHING})
    }
  };