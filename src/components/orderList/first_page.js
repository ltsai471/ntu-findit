import React, { useState, useEffect } from 'react';
import OrderList from "./OrderList";
import { getOrders } from "../../webAPI";

function OrderListContainer() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState();
  const submitQuery = (e) => {
    e.preventDefault();
    getOrders(query).then((result) => {
      setOrders(result);
    });
  };

  return (
    <div className="home">
      <div class="container">
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button
          type="button"
          onClick={submitQuery}
        >
          search
        </button>
        <OrderList orders={orders} />
      </div>
    </div>
  );
}

export default OrderListContainer;