import Cartitem from "../Components/Cartitem";
import { getCart } from "../redux/actions/cartActions";
import { placeOrder } from "../redux/actions/orderActions";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import empty from "../Components/images/undraw_empty_cart_co35.svg"
const Cart = ({ getCart, cart, placeOrder, history, user, cartResponse }) => {
  const handleclickplaceorder = () => {
    placeOrder(history);
  };
  useEffect(() => {
    if (sessionStorage.getItem("auth_token")) {
      getCart();
    }
  }, [getCart]);
  return user ? (
    !cart ? (
      <div style={{ position: "absolute", top: "40%", left: "45%" }}>
        <div class="lds-dual-ring"></div>
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
            <p className='head'>Your Cart is Empty</p>
           <img src={empty} alt="empty cart" style={{height:"19rem", width:'50rem',marginTop:"2rem" }}/>
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
