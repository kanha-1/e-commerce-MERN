import {TOGGLE_IS_ORDER_FETCHING, SET_ORDERS} from '../actionTypes'
import axios from 'axios'


export const placeOrder = (history) => async (dispatch) => {

    try {
      dispatch({type:TOGGLE_IS_ORDER_FETCHING})
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/order`,{},{
            headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
          }
      );
      console.log(data)
      if(data.success){
        history.push('/checkout')
      }
      else{
          alert(data.message)
      }
    } catch (err) {
      alert(err.message)
      console.error(err);
    }
    finally{
      dispatch({type:TOGGLE_IS_ORDER_FETCHING})
    }
  };

  export const getallOrders = () => async (dispatch) => {

    try {
      dispatch({type:TOGGLE_IS_ORDER_FETCHING})
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/order/be`,{
            headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
          }
      );
      console.log(data)
      if(data.success){
        dispatch({type:SET_ORDERS, payload:data.orders})
      }
      else{
          alert(data.message)
      }
    } catch (err) {
      alert(err.message)
      console.error(err);
    }
    finally{
      dispatch({type:TOGGLE_IS_ORDER_FETCHING})
    }
  };