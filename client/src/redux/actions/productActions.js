import { SET_PRODUCTS, TOGGLE_ISPRODUCTFETCHING_STATE } from "../actionTypes";
import axios from "axios";

export const fetchAllProducts = () => async (dispatch) => {
	try {
		dispatch({ type: TOGGLE_ISPRODUCTFETCHING_STATE });
		dispatch({ type: SET_PRODUCTS, payload: null });
		const { data } = await axios.get(
			`${process.env.REACT_APP_BASE_URL}/product/be`,
			{
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
				},
			},
		);
		if (data.success) {
			dispatch({ type: SET_PRODUCTS, payload: data.products });
		} else {
			alert(data.message);
		}
	} catch (err) {
		console.error(err);
	} finally {
		dispatch({ type: TOGGLE_ISPRODUCTFETCHING_STATE });
	}
};
