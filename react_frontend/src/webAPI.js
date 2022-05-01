import { getAuthToken } from "./utils";

const BASE_URL = 'http://140.112.106.237:16896'

export const login = (username, password) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "password": password,
    "username": username
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(`${BASE_URL}/api-token-auth/`, requestOptions)
    .then((response) => response.json());
};


// 身分驗證
export const verifyAccount = () => {
  const token = getAuthToken();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "token": token
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(`${BASE_URL}/api-token-verify/`, requestOptions)
    .then(response => response.json());
};


export const getOrders = (query) => {
  const token = getAuthToken();
  var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(`${BASE_URL}/api/orders/?query=${query}`, requestOptions)
    .then(response => response.json());
};


export const createItem = (lossDatetime, itemPlace, itemType, itemDesc) => {
  const token = getAuthToken();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify({
    "foundOrLoss": "loss",
    "status": "U",
    "accountId": "test",
    "lossDatetime": lossDatetime,
    "itemPlace": itemPlace,
    "itemType": itemType,
    "itemDesc": itemDesc
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(`${BASE_URL}/api/item/`, requestOptions)
    .then((response) => response.json());
};
