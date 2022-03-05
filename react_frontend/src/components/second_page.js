import React, { useEffect } from "react";
import { useParams } from "react-router";
import "../styles.css";

let rows = [
  {
    "id": "001",
    "customer": "Steve"
  },
  {
    "id": "017",
    "customer": "Steve"
  },
  {
    "id": "021",
    "customer": "Steve"
  },
  {
    "id": "101",
    "customer": "Steve"
  }
];

function OrderDetail() {
  let { orderDetail } = useParams();

  useEffect(() => {
    // Fetch post using the postSlug
  }, [orderDetail]);

  return (
    <div className="home">
      <div class="container">
        <table className="mt-10">
          <tr>
            <td colspan="2">Order</td>
          </tr>
          <tr>
            <td>ID</td>
            <td>{orderDetail}</td>
          </tr>
          <tr>
            <td>Customer</td>
            <td>Francisco Chang</td>
          </tr>
          <tr>
            <td>Items</td>
            <td>Roland Mendel</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default OrderDetail;