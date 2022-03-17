import React from "react";
import { Link } from "react-router-dom";
import "../../styles.css";

function OrderRow(props) {
  const order = props.order;

  return (
    <tr>
      <td>
        <Link to={order.id} state={order}
        >
          <span className="rgt-text-truncate" style={{ marginLeft: 10 }}>
            {order.id}
          </span>
        </Link>
      </td>
      <td>{order.customer}</td>
    </tr>
  );
}

export default OrderRow;
