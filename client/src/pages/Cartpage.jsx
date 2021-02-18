import Cartitem from "../Components/Cartitem";
import { getCart } from "../redux/actions/cartActions";
import { placeOrder } from "../redux/actions/orderActions";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";

const Cart = ({ getCart, cart, placeOrder, history, user, cartResponse }) => {
  const handleclickplaceorder = () => {
    placeOrder(history);
  };
  const handleclicktohome = () => {
    history.push("/home");
  };
  useEffect(() => {
    if (sessionStorage.getItem("auth_token")) {
      getCart();
    }
  }, [getCart]);
  return user ? (
    !cart ? (
      <div style={{ position: "absolute", top: "40%", left: "45%" }}>
        <div class="lds-hourglass"></div>
      </div>
    ) : (
      <>
        <table className="table-alternating margin-top margin-left margin-right">
          {cartResponse ? (
            <div
              style={{ position: "absolute", top: "35%", left: "45%" }}
              class="lds-dual-ring"
            ></div>
          ) : null}

          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              return <Cartitem key={item._id} data={item} />;
            })}
          </tbody>
        </table>
        {cart.length === 0 ? (
          <div>
            <h3>Your Cart is empty. Please add some item.</h3>

            <h4
              style={{
                color: "#57A2E9",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={handleclicktohome}
            >
              Click here to go to Home page
            </h4>
          </div>
        ) : (
          <input
            type="button"
            onClick={handleclickplaceorder}
            class="btn-secondary margin-top"
            value="Place Order"
          />
        )}
      </>
    )
  ) : (
    <Redirect to="/" />
  );
};

const mapdispatchtoprops = (storeData) => {
  return {
    user: storeData.userState.user,
    cart: storeData.cartState.cart,
    cartResponse: storeData.cartState.iscartFetching,
  };
};

export default connect(mapdispatchtoprops, { getCart, placeOrder })(Cart);
