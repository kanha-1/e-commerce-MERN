import { SET_USER,SET_USER_RESPONSE, TOGGLE_USER_RESPONSE, LOGOUT_USER} from '../actionTypes'
import axios from 'axios'




export const registerUser = ({user, history}) => async (dispatch) => {
    try {
      dispatch({type:TOGGLE_USER_RESPONSE})
      dispatch({type:SET_USER_RESPONSE, payload:null})
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/register`, user
      );
      console.log(res)
      if (res.data.success){
        sessionStorage.setItem("auth_token", res.data.token)
        dispatch({
          type:SET_USER,
          payload:res.data.user
        })
        
        dispatch({
          type:SET_USER_RESPONSE,
          payload:res.data
        })
        setTimeout(()=>{
          history.push('/home')
        },1000)
      }
     else{
      dispatch({
        type:SET_USER_RESPONSE,
        payload:res.data
      })
     } 
      
    } catch (err) {
      console.error(err);
      alert(err.message)
    }
    finally{
      dispatch({type:TOGGLE_USER_RESPONSE})
    }
  };

  export const loginUser = ({user, history}) => async (dispatch) => {

    try {
      dispatch({type:TOGGLE_USER_RESPONSE})
      dispatch({type:SET_USER_RESPONSE, payload:null})
      dispatch({type:SET_USER, payload:null})
      const {data} = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/login`, user
      );
      
      if(data.success){
        dispatch({
          type:SET_USER,
          payload:data.user
        })
        sessionStorage.setItem("auth_token", data.token)
        dispatch({
          type:SET_USER_RESPONSE,
          payload:data
        })
      setTimeout(()=>{
        history.push('/home')
      },1000)
        
      }
      else{
       
        dispatch({
          type:SET_USER_RESPONSE,
          payload:data
        })
      }
      
      
    } catch (err) {
      console.log(err);
      alert(err.message)
    } 
    finally{
      dispatch({type:TOGGLE_USER_RESPONSE})
    }
  };
  export const logoutUser = (history) => async (dispatch) => {
    try{
      dispatch({type:TOGGLE_USER_RESPONSE})
      const {data} = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/logout`,{}, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("auth_token")}` },
        }
      );
    if(data.success){
      dispatch({
        type:LOGOUT_USER
      })
      history.push("/")
    }
    else{
      alert(data.err.messsage)
    }
    }
catch(e){
  alert(e.message)
}
finally{
 dispatch({type:TOGGLE_USER_RESPONSE})
}};