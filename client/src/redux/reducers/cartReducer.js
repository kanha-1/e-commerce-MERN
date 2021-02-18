import { SET_CART, TOGGLE_IS_CART_FETCHING } from "../actionTypes";

const initialState = {
  cart: null,
  iscartFetching: false,
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CART:
      return { ...state, cart: payload };
    case TOGGLE_IS_CART_FETCHING:
      return { ...state, iscartFetching: !state.iscartFetching };
    default:
      return state;
  }
};

export default productReducer;
