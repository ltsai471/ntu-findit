import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  OrderList,
  OrderDetail,
} from "./components";

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      {/* <Route path="/Blog" element={<Blog />}>
        <Route path="" element={<Posts />} />
        <Route path=":postSlug" element={<Post />} />
      </Route> */}
      <Route path="/" element={<OrderList />}></Route>
      <Route path="/:orderDetail" element={<OrderDetail />} />
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);

serviceWorker.unregister();

