import { SET_ORDERS, TOGGLE_IS_ORDER_FETCHING } from "../actionTypes";

const initialState = {
  orders: null,
  isorderFetching: false,
};

const orderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ORDERS:
      return { ...state, orders: payload };
    case TOGGLE_IS_ORDER_FETCHING:
      return { ...state, isorderFetching: !state.isorderFetching };
    default:
      return state;
  }
};

export default orderReducer;
