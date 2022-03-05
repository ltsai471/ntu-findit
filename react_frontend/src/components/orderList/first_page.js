import React from "react";
import ReactDOM from "react-dom";
import SearchBar from "./SearchBar";
import OrderList from "./OrderList";

// ReactDOM.render(
//   <Router>
//     <Navigation />
//     <Routes>
//       {/* <Route path="/Blog" element={<Blog />}>
//         <Route path="" element={<Posts />} />
//         <Route path=":postSlug" element={<Post />} />
//       </Route> */}
//       <Route path="/" element={<OrderList />}></Route>
//       <Route path="/:orderDetail" element={<OrderDetail />} />
//     </Routes>
//     <Footer />
//   </Router>,

//   document.getElementById("root")
// );

// serviceWorker.unregister();


// import React from "react";
// import { Outlet } from "react-router-dom";

function OrderListContainer(props) {
  return (
    <div className="home">
      <div class="container">
        <SearchBar />
        <OrderList orders={props.orders} />
      </div>
    </div>
  );
}

export default OrderListContainer;