import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useLocation } from 'react-router-dom'
import "../styles.css";

function OrderDetail() {
  const location = useLocation()
  const { id, customer } = location.state

  // let { orderDetail } = useParams();
  // // let {state} = useState(0);
  // // const [id, customer] = useState();

  // useEffect(() => {
  //   // Fetch post using the postSlug
  // }, [orderDetail]);

  return (
    <div className="home">
      <div class="container">
        <table className="mt-10">
          <tr>
            <td colspan="2">Order</td>
          </tr>
          <tr>
            <td>ID</td>
            <td>{id}</td>
          </tr>
          <tr>
            <td>Customer</td>
            <td>{customer}</td>
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