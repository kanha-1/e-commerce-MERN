import React from "react";
import utills from "../utils";

const Orderitem = ({ data }) => {
  return (
    <tr>
      <td>{utills.limitDescription(data.productId?.name, 30)}</td>
      <td>{data?.quantity}</td>
      <td>Rs. {data?.amount}</td>
      <td>{data?.status}</td>
    </tr>
  );
};

export default Orderitem;
