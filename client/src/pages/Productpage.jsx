import { useEffect } from "react";
import Productcard from "../Components/Productcard";
import { connect } from "react-redux";
import { fetchAllProducts } from "../redux/actions/productActions";
import { Redirect } from "react-router-dom";

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
      <div className="row flex-center">
        {productData.map((product) => {
          return <Productcard key={product._id} data={product} />;
        })}
      </div>
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
