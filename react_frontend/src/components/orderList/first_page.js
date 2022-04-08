import React, { useState, useEffect } from 'react';
import OrderList from "./OrderList";
// import axios from "axios";
import { getOrders } from "../../webAPI";

function OrderListContainer() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState();
  // const [url, setUrl] = useState('/api/orders/?query=none',);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios(url);
  //     setOrders(result.data);
  //   };

  //   fetchData();
  // }, [url]);
  const submitQuery = (e) => {
    e.preventDefault();
    getOrders(query).then((result) => {
      setOrders(result);
    });
  };

  return (
    <div className="home">
      <div class="container">
        {/* <SearchBar /> */}
        {/* <SearchBar
          queryText={query}
          onQueryTextChange={event => setQuery(event.target.value)}
        /> */}
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button
          type="button"
          // onClick={() =>
          //   setUrl(`/api/orders/?query=${query}`)
          // }
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