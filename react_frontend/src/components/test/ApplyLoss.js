import React, { useState, useContext } from 'react';
// import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { createItem } from "../../webAPI";
// import { setAuthToken } from "../utils";
// import AuthContext from "../contexts";

export default function ApplyLossPage() {
  const [lossDatetime, setLossDatetime] = useState("");
  const [itemPlace, setItemPlace] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // const { setUser } = useContext(AuthContext);

  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createItem(lossDatetime, itemPlace, itemType, itemDesc).then((data) => {
      alert('Done');
      //   if (data.token == null) {
      //     setLoading(false);
      //     alert('Login failed');
      //     return setErrorMessage('Login failed');
      //   }
      //   setAuthToken(data.token);
      //   verifyAccount().then((response) => {
      //     if (data.token == null) {
      //       setAuthToken(null);
      //       alert('Error when getting user data');
      //       setErrorMessage('Error when getting user data');
      //     }
      //     setUser(response.token);
      //     navigate("/");
      //   });
    });
  };

  const handleLossDatetime = (e) => {
    setLossDatetime(e.target.value);
  };

  const handleItemPlace = (e) => {
    setItemPlace(e.target.value);
  };

  const handleItemType = (e) => {
    setItemType(e.target.value);
  };

  const handleItemDesc = (e) => {
    setItemDesc(e.target.value);
  };

  return (
    <p>hello</p>
    // <div className="home">
    //   <div class="container">
    //     <div>
    //       <span>時間:</span>
    //       <input
    //         type="text"
    //         value={lossDatetime}
    //         onChange={handleLossDatetime}
    //       />
    //     </div>
    //     <div>
    //       <span>地點:</span>
    //       <input
    //         type="itemPlace"
    //         value={itemPlace}
    //         onChange={handleItemPlace}
    //       />
    //     </div>
    //     <div>
    //       <span>物品分類:</span>
    //       <input
    //         type="itemType"
    //         value={itemType}
    //         onChange={handleItemType}
    //       />
    //     </div>
    //     <div>
    //       <span>物品描述:</span>
    //       <input
    //         type="itemDesc"
    //         value={itemDesc}
    //         onChange={handleItemDesc}
    //       />
    //     </div>
    //     <button
    //       type="button"
    //       onClick={handleSubmit}
    //     >
    //       送出
    //     </button>
    //   </div>
    // </div>
  );
}