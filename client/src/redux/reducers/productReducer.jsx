import { SET_PRODUCTS, TOGGLE_ISPRODUCTFETCHING_STATE } from "../actionTypes";

const initialState = {
  products: null,
  isproductFetching: false,
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PRODUCTS:
      return { ...state, products: payload };
    case TOGGLE_ISPRODUCTFETCHING_STATE:
      return { ...state, isproductFetching: !state.isproductFetching };
    default:
      return state;
  }
};

export default productReducer;
