import { connect } from "react-redux";
import { useState } from "react";
import { addtoCart } from "../redux/actions/cartActions";

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
    <div
      className="card lg-3 margin md-4 sm-6 padding-small border-secondary"
      style={{ width: "15rem" }}
    >
      <img style={{ height: "350px" }} src={image} alt="" />

      <div className="card-body">
        <h4 className="card-title">{limitDescription(name, 20)}</h4>
        <h4 className="card-title">Rs. {cost}</h4>
        <button
          className="border-secondary"
          data-id={_id}
          onClick={handleaddCart}
        >
          {id === _id && cartResponse ? "Adding to Cart..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

const mapdispatchtoprops = (storeData) => {
  return {
    cartResponse: storeData.cartState.iscartFetching,
  };
};

export default connect(mapdispatchtoprops, { addtoCart })(Productcard);
