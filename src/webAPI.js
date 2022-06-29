import { getAuthToken, datetimeFormat } from "./utils";

// OCR Deploy Link
const OCR_BASE_URL = "https://ntu-findit-ocr.herokuapp.com/ocr/";

const BASE_URL = "https://ntulost.herokuapp.com";
// const BASE_URL = "http://localhost:8000";

// 註冊
export const signup = (name, username, password) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    name: name,
    username: username,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(`${BASE_URL}/ntulost/signup/`, requestOptions).then((response) =>
    response.json()
  );
};

// 登入
export const login = (username, password) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    username: username,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(`${BASE_URL}/ntulost/login/`, requestOptions).then((response) =>
    response.json()
  );
};

// get jwt token
export const login_token = (username, password) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    username: username,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(`${BASE_URL}/ntulost/api-token-auth/`, requestOptions).then(
    (response) => response.json()
  );
};

// 申報遺失物或拾獲案件
export const createItem = (
  foundOrLoss,
  status,
  username,
  lossDatetime,
  itemPlace,
  itemType,
  itemDesc,
  image,
  imgFilename,
  latitude,
  longitude
) => {
  const token = getAuthToken();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify({
    foundOrLoss: foundOrLoss,
    status: status,
    accountId: username,
    lossDatetime: lossDatetime,
    itemPlace: itemPlace,
    itemType: itemType,
    itemDesc: itemDesc,
    image: image,
    imgFilename: imgFilename,
    latitude: latitude,
    longitude: longitude,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(`${BASE_URL}/ntulost/item/`, requestOptions).then((response) =>
    response.json()
  );
};

// 身分驗證
export const verifyAccount = () => {
  const token = getAuthToken();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify({
    token: token,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(`${BASE_URL}/ntulost/api-token-verify/`, requestOptions).then(
    (response) => response.json()
  );
};

// 在 MapView 取得 Filter 過後的拾獲物品
export const getFilteredItems = (payload) => {
  const token = getAuthToken();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify(payload);

  const requestOptions = {
    token: token,
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  // return fetch(`${BASE_URL}/ntulost/item/itemsFilter/`, requestOptions).then(
  //   (response) => response.json()
  // );
  return fetch(`${BASE_URL}/ntulost/itemsFilter/`, requestOptions).then(
    (response) => response.json()
  );
};

// 取得用戶 遺失物 or 拾獲物
export const getUserItems = (apiCategory, userId) => {
  const token = getAuthToken();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    token: token,
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `${BASE_URL}/ntulost/item/${apiCategory}/?userId=${userId}`,
    requestOptions
  ).then((response) => response.json());
};

// 取得個人資料
export const getUserInfo = (username) => {
  const token = getAuthToken();
  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify({
    username: username,
  });

  const requestOptions = {
    token: token,
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(`${BASE_URL}/ntulost/userInfo/`, requestOptions).then(
    (response) => response.json()
  );
};

// 忘記密碼
export const sendResetPwdMail = (username) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    username: username,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(`${BASE_URL}/ntulost/forgetPwd/`, requestOptions).then(
    (response) => response.json()
  );
};

// 重設密碼
export const resetPwd = (arg, password) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    arg: arg,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(`${BASE_URL}/ntulost/resetPwd/`, requestOptions).then(
    (response) => response.json()
  );
};

// 修改個人資料
export const modifyUserInfo = (username, image, name, filename) => {
  const token = getAuthToken();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify({
    username: username,
    photo: image,
    name: name,
    filename: filename,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(`${BASE_URL}/ntulost/modifyUserInfo/`, requestOptions).then(
    (response) => response.json()
  );
};

// 歸還案件
export const returnLost = (ownerId, itemId) => {
  const token = getAuthToken();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  const raw = JSON.stringify({
    foundOrLoss: "loss",
    status: "done",
    itemOwnerId: `${ownerId}@ntu.edu.tw`,
    closeDatetime: dateTime,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(`${BASE_URL}/ntulost/item/${itemId}`, requestOptions).then(
    (response) => response.json()
  );
};

// 物品與學生證辨識
export const objectRecognition = (imgType, imageData) => {
  // const token = getAuthToken();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify({
    imgType: imgType,
    image: imageData,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(OCR_BASE_URL, requestOptions).then((response) =>
    response.json()
  );
};

// 物品與學生證辨識
export const closestItemPlace = (latitude, longitude) => {
  const token = getAuthToken();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify({
    latitude: latitude,
    longitude: longitude,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(`${BASE_URL}/ntulost/closestItemPlace/`, requestOptions).then(
    (response) => response.json()
  );
};

// 我的遺失物資料
export const getUserLossItem = (userId) => {
  const token = getAuthToken();
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `${BASE_URL}/ntulost/item/userLossItem/?userId=${userId}`,
    requestOptions
  ).then((response) => response.json());
};

// 取得自動配對案件
export const getLossItemPair = (itemId) => {
  const token = getAuthToken();
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `${BASE_URL}/ntulost/item/lossItemPair/?itemId=${itemId}`,
    requestOptions
  ).then((response) => response.json());
};

// 移除自動配對案件
export const removeItempair = (lossItemId, foundItemId) => {
  const token = getAuthToken();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `${BASE_URL}/ntulost/itempair/${lossItemId}/${foundItemId}`,
    requestOptions
  ).then((response) => response.json());
};

// 取得自動配對案件
export const getUserFoundItem = (userId) => {
  const token = getAuthToken();
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `${BASE_URL}/ntulost/item/userFoundItem/?userId=${userId}`,
    requestOptions
  ).then((response) => response.json());
};

// 在「你的拾獲案件」取得該用戶的 finding, contact, done 拾獲紀錄
export const getUserFoundItems = (payload) => {
  const token = getAuthToken();
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  payload.startDatetime = datetimeFormat(payload.startDatetime);
  payload.endDatetime = datetimeFormat(payload.endDatetime);

  const raw = JSON.stringify(payload);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(`${BASE_URL}/ntulost/item/userFoundItem/`, requestOptions).then(
    (response) => response.json()
  );
};

// 抓取過往聊天紀錄
export const preMessage = (roomInfo, userAccount) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    roomInfo: roomInfo,
    userAccount: userAccount,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  return fetch(`${BASE_URL}/ntulost/preMessage/`, requestOptions).then(
    (response) => response.json()
  );
};

// 抓取過往聊天紀錄
export const getMsgList = (userAccount) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    userAccount: userAccount,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  return fetch(`${BASE_URL}/ntulost/chatroomList/`, requestOptions).then(
    (response) => response.json()
  );
};
