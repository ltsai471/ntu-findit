import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import './i18n/config'; // 參照組態檔


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
