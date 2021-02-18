import React, { useEffect } from "react";
import Orderitem from "../Components/Orderitem";
import { connect } from "react-redux";
import { getallOrders } from "../redux/actions/orderActions";
import { Redirect } from "react-router-dom";

const Orderpage = ({ orders, getallOrders, history, user }) => {
  useEffect(() => {
    if (sessionStorage.getItem("auth_token")) {
      getallOrders();
    }
  }, [getallOrders]);
  const handleclicktohome = () => {
    history.push("/home");
  };
  return user ? (
    !orders ? (
      <div style={{ position: "absolute", top: "40%", left: "45%" }}>
        <div class="lds-hourglass"></div>
      </div>
    ) : orders.length === 0 ? (
      <div>
        <h3>Your Orders are empty. Please order some item.</h3>

        <h4
          style={{ color: "#57A2E9", textAlign: "center", cursor: "pointer" }}
          onClick={handleclicktohome}
        >
          Click here to go to Home page
        </h4>
      </div>
    ) : (
      <table className="table-alternating margin-top margin-left margin-right">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => {
            return <Orderitem key={item._id} data={item} />;
          })}
        </tbody>
      </table>
    )
  ) : (
    <Redirect to="/" />
  );
};

const mapstatetoprops = (storeData) => {
  return {
    user: storeData.userState.user,
    orders: storeData.orderState.orders,
  };
};

export default connect(mapstatetoprops, { getallOrders })(Orderpage);
