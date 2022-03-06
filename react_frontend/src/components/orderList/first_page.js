import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import SearchBar from "./SearchBar";
import OrderList from "./OrderList";
import axios from "axios";

// const orders = [
//   {
//     "id": "001",
//     "customer": "Steve"
//   },
//   {
//     "id": "017",
//     "customer": "Steve"
//   },
//   {
//     "id": "021",
//     "customer": "Steve"
//   },
//   {
//     "id": "045",
//     "customer": "Laura"
//   }
// ];

function OrderListContainer() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("/api/orders/")
      .then((res) => this.setOrders({ orders: res.data }))
      .catch((err) => console.log(err));
  });
  
  
  // {
  //   getOrders().then(data => {
  //     setOrders(data.orders)
  //   });
  // }, []);

  return (
    <div className="home">
      <div class="container">
        <SearchBar />
        <OrderList orders={orders} />
      </div>
    </div>
  );
}

export default OrderListContainer;