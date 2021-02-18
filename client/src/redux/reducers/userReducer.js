import {
    SET_USER,
    SET_USER_RESPONSE,
    TOGGLE_USER_RESPONSE,
    LOGOUT_USER
  } from "../actionTypes";
  
  const initialState = {
    user: JSON.parse(sessionStorage.getItem("user")) || null,
    userResponse:null,
    isUserResponsefetching: false
  };
  
  const userReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case SET_USER:
        const userJSON = JSON.stringify(payload);
        sessionStorage.setItem("user", userJSON);
        return { ...state, user: payload };
      case SET_USER_RESPONSE:
        return {...state, userResponse:payload}
      case TOGGLE_USER_RESPONSE:
        return {...state, isUserResponsefetching:!state.isUserResponsefetching}
        case LOGOUT_USER:
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("auth_token")
          return { ...state, user: null,userResponse:null };
      default:
        return state;
    }
  };
  
  export default userReducer;