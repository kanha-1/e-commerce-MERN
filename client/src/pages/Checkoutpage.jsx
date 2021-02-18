import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
const Checkoutpage = ({ user }) => {
  return user ? (
    <div>
      <h2>Your order has been placed successfully!</h2>
      <Link to="order">
        <h5>Click here to see your Orders</h5>
      </Link>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

const mapstatetoprops = (storeData) => {
  return {
    user: storeData.userState.user,
  };
};

export default connect(mapstatetoprops)(Checkoutpage);
