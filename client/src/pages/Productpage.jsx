import { useEffect } from "react";
import Productcard from "../Components/Productcard";
import { connect } from "react-redux";
import { fetchAllProducts } from "../redux/actions/productActions";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
const Productpage = ({ fetchAllProducts, productData, cartResponse, user }) => {
	useEffect(() => {
		if (sessionStorage.getItem("auth_token")) {
			fetchAllProducts();
		}
	}, [fetchAllProducts]);

	return user ? (
		!productData ? (
			<div style={{ position: "absolute", top: "40%", left: "45%" }}>
				<div class="lds-hourglass"></div>
			</div>
		) : (
			<Grid className="m-3"
				spacing={2}
				container
				direction="row"
				justify="center"
				alignItems="center">
				{productData.map((product) => {
					return <Productcard key={product._id} data={product} />;
				})}
			</Grid>
		)
	) : (
		<Redirect to="/" />
	);
};

const mapStatetoProps = (storeData) => {
	return {
		user: storeData.userState.user,
		productData: storeData.productState.products,
		cartResponse: storeData.cartState.iscartFetching,
	};
};

export default connect(mapStatetoProps, { fetchAllProducts })(Productpage);
