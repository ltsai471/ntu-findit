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

// const userRequest = axios.create({
//     baseURL: 'http://localhost:8000',
//     headers: { 'Content-Type': 'application/json' },
//   })

// export const login = (Password, Username) => {
//     return userRequest.post("/api-token-auth/",
//     JSON.stringify({
//         Password,
//         Username,})
//         ).then((res) => res.data).catch((err)=>err.toString());
//   };