import utills from "../utils";
import { setQuantity } from "../redux/actions/cartActions";
import { connect } from "react-redux";
import { useState } from "react";
const Cartitem = ({ data, setQuantity }) => {
  const handleChangequantity = (e) => {
    console.log(e.target);
    setQuantityState(e.target.value);
    setQuantity(
      { id: e.target.dataset.id, quantity: Number(e.target.value) },
      window
    );
  };
  const [quantity, setQuantityState] = useState(data.quantity);
  return (
    <tr>
      <td>{utills.limitDescription(data.productId?.name, 30)}</td>
      <td>
        <div class="form-group margin-none">
          <select
            data-id={data.productId?._id}
            onChange={handleChangequantity}
            value={String(quantity)}
            style={{
              width: "3rem",
              height: "1.8rem",
              cursor: "pointer",
              padding: "2px",
            }}
            id="paperSelects1"
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </td>
      <td>Rs. {Number(quantity) * Number(data.productId?.cost)}</td>
    </tr>
  );
};

export default connect(null, { setQuantity })(Cartitem);
