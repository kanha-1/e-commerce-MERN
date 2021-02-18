import { connect } from "react-redux";
import { useState } from "react";
import { addtoCart } from "../redux/actions/cartActions";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

const Productcard = ({ data, addtoCart, cartResponse }) => {
	const [id, setid] = useState("");
	const { image, name, cost, _id } = data;
	const limitDescription = (description, letterlimit) => {
		return description.length <= letterlimit
			? description
			: `${description.slice(0, letterlimit)}...`;
	};
	const handleaddCart = (e) => {
		const id = e.target.dataset.id;
		setid(id);
		const prodObj = {
			productId: id,
		};
		addtoCart(prodObj);
	};
	return (
		<>
			<Grid item xs={3}>
				<Card className="card">
					<img style={{ height: "200px" }} src={image} alt="" />
					<div className='pl-2'>
						<p className="title">{limitDescription(name, 20)}</p>
						<p className="title">Rs. {cost}</p>
						<button
							startIcon={<AddIcon />}
							data-id={_id}
							onClick={handleaddCart}>
							{id === _id && cartResponse ? "Adding to Cart..." : "Add to Cart"}
						</button>
					</div>
				</Card>
			</Grid>
		</>
	);
};

const mapdispatchtoprops = (storeData) => {
	return {
		cartResponse: storeData.cartState.iscartFetching,
	};
};

export default connect(mapdispatchtoprops, { addtoCart })(Productcard);
