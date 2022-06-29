const TOKEN_NAME = "token";
// import axios from "axios";

// 將 token 存到 localStorage
export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

// 從 localStorage 讀取 token
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

export const setLoginUser = (username) => {
  localStorage.setItem("username", username);
};

export const getLoginUser = () => {
  return localStorage.getItem("username");
};

export const setLanguage = (language) => {
  localStorage.setItem("language", language);
};

export const getLanguage = () => {
  return localStorage.getItem("language");
};


// 登出
export const logout = () => {
    localStorage.removeItem(TOKEN_NAME);
};

//日期轉換成 YYYY-MM-DD HH:mm:ss
export const datetimeFormat = (dt) => {
  var dt = new Date(dt);
  var date = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
  var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
  var dateTime = date + ' ' + time;
  return dateTime;
};
