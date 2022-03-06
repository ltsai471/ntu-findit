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
  const [loading, setLoading] = useState(true);
  // const [data, setData] = useState([])

  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState('redux');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('/api/orders/');
      setOrders(result.data);
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <div class="container">
        <SearchBar />
        <OrderList orders={orders} />
        {orders.map(item => (<span>{item.id}  </span>))}
      </div>
    </div>
  );
}

export default OrderListContainer;