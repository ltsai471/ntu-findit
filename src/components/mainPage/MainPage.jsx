import React, { useState, useEffect, useRef } from "react";
import { CssBaseline, Box, Grid } from "@mui/material";
import Item from "../Item";

import ViewTypeFilter from "./ViewTypeFilter";
import BasicDateTimePicker from "./BasicDateTimePicker";
import PlaceFilter from "./PlaceFilter";
import ItemTypeFilter from "./ItemTypeFilter";
import GoogleMap from "./GoogleMap";
import ImageBoard from "./ImageBoard";
import PreviewSection from "./PreviewSection";
// import usePrevious from "../../hooks/usePrevious";
import { getFilteredItems } from "../../webAPI";
import { datetimeFormat, getLanguage } from "../../utils";

// const dummyResponse = [
//   {
//     id: 60,
//     status: "finding",
//     lossDatetime: "2022-04-07T09:08:00+08:00",
//     itemPlace: "舟山路2",
//     preservePlace: "xx保管處",
//     itemType: "學生證",
//     itemDesc: "b07501022的學生證",
//     img: "/media/images/idcard_FPdjbJu.jpg",
//     longitude: "no data",
//     latitude: "no data",
//   },
//   {
//     id: 1,
//     status: "finding",
//     lossDatetime: "2022-04-07T15:49:00+08:00",
//     itemPlace: "舟山路2",
//     preservePlace: "xx保管處4",
//     itemType: "學生證",
//     itemDesc: "b07501024的學生證",
//     img: null,
//     longitude: "121.53809685921885",
//     latitude: "25.015627716599024",
//   },
//   {
//     id: 2,
//     status: "finding",
//     lossDatetime: "2022-04-08T15:49:00+08:00",
//     itemPlace: "總圖",
//     preservePlace: "xx保管處4",
//     itemType: "手機",
//     itemDesc: "iphone12 pro max",
//     img: null,
//     longitude: "121.54041177120237",
//     latitude: "25.017240540499593",
//   },
// ];

var itemTypeListLevel1 = ["證件", "書本", "電子產品", "私人貴重物品", "服飾", "文具", "其他"]; // prettier-ignore
var itemTypeListLevel2 = {
  "": [""],
  證件: ["學生證", "身分證", "健保卡"],
  電子產品: ["手機", "筆電", "滑鼠", "鍵盤"],
  書本: ["課本", "紙"],
  私人貴重物品: ["鑰匙", "錢包"],
  服飾: ["鞋子", "帽子", "衣服", "背包", "手提包", "領帶"],
  文具: ["剪刀"],
  其他: ["水壺", "棒球", "滑板", "網球", "杯子", "盤子", "鏡子", "腳踏車", "雨傘", "其他"], // prettier-ignore
};

if (getLanguage() == "en") {
  itemTypeListLevel1 = ["id_documents", "books", "electronic_devices", "personal_valuables", "apparel_and_accesories", "stationery", "others"]; // prettier-ignore
  itemTypeListLevel2 = {
    "": [""],
    id_documents: ["student id", "identification card", "health id card"],
    electronic_devices: ["cellphone", "laptop", "mouse", "keyboard"],
    books: ["textbook", "paper"],
    personal_valuable: ["key", "wallet/purse"],
    apparel_and_accesories: ["shoes", "hat/cap", "shirt", "backpack", "handbag", "neck tie"], // prettier-ignore
    stationery: ["scissors"],
    others: ["bottle", "baseball", "skateboard", "tennis ball", "cup", "plate", "mirror", "bicycle", "umbrella", "others"], // prettier-ignore
  };
}

const MainPage = () => {
  // const [loggedIn, setLoggedIn] = useState(false);
  const [viewType, setViewType] = useState("地圖顯示");
  const [itemPlace, setItemPlace] = useState("");
  const [itemTypeLevel1, setItemTypeLevel1] = useState("");
  const [itemTypeLevel2, setItemTypeLevel2] = useState("");
  const [endDatetime, setEndDatetime] = useState(new Date());
  const defaultStartDatetime = new Date(endDatetime.getTime());
  defaultStartDatetime.setMonth(defaultStartDatetime.getMonth() - 2);
  const [startDatetime, setStartDatetime] = useState(defaultStartDatetime); // two month ago
  const [allFoundItems, setAllFoundItems] = useState([]);

  // 透過 Filter 向後端取得對應的 data
  useEffect(() => {
    const payload = {
      itemPlace,
      itemTypeLevel1,
      itemTypeLevel2,
      startDatetime: datetimeFormat(startDatetime),
      endDatetime: datetimeFormat(endDatetime),
    };

    getFilteredItems(payload).then((data) => {
      if ("detail" in data) data = [];
      setAllFoundItems(data);
      console.log(data);
    });
    // const getItemFilterData = async () => {
    //   const payload = {
    //     itemPlace,
    //     itemTypeLevel1,
    //     itemTypeLevel2,
    //     startDatetime: datetimeFormat(startDatetime),
    //     endDatetime: datetimeFormat(endDatetime),
    //   };
    //   const data = await getFilteredItems(payload);
    //   if ("detail" in data) data = [];
    //   setAllFoundItems(data);
    // };
    // getItemFilterData();
  }, [itemPlace, itemTypeLevel1, itemTypeLevel2, startDatetime, endDatetime]);

  // 解析 allFoundItems 資料，經過所有 Filters 的過濾後，存入 filteredItems
  const filteredItems = allFoundItems
    .filter(({ latitude, longitude }) => {
      if (viewType === "照片顯示") return true;
      return latitude !== null && longitude !== null;
    })
    .map((item) => {
      return {
        id: item.id,
        latitude: Number(item.latitude),
        longitude: Number(item.longitude),
        lossDatetime: new Date(item.lossDatetime),
        itemType: item.itemType.name,
        itemDesc: item.itemDesc,
        img: item.img,
        imgFilename: item.imgFilename,
        place: item.itemPlace.name,
        preservePlace: item.preservePlace,
        imgArray: item.imgArray,
      };
    })
    .filter(
      ({ lossDatetime }) =>
        startDatetime <= lossDatetime && lossDatetime <= endDatetime
    )
    .filter(({ place }) => {
      if (!itemPlace) return true; // 預設顯示全部地點
      return place.includes(itemPlace);
    })
    .filter(({ itemType }) => {
      if (!itemTypeLevel1) return true;
      const itemCategory = Object.entries(itemTypeListLevel2).filter(
        ([key, value]) => {
          return value.includes(itemType);
        }
      )[0][0];
      return itemCategory === itemTypeLevel1;
    })
    .filter(({ itemType }) => {
      if (!itemTypeLevel2) return true;
      return itemType === itemTypeLevel2;
    });

  // 把相同經緯度的 marker 打散一點，不要完全重疊
  filteredItems.forEach((item) => {
    item.latitude += (Math.random() - 0.5) * 0.0005;
    item.longitude += (Math.random() - 0.5) * 0.0005;
  });

  // 根據得到的 data 重新渲染頁面，包含更改 Map 的顯示、Filter 上的值等等
  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ width: "100%", mt: "1%", mb: "1%" }}>
        <Item>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3} lg={3}>
              <ViewTypeFilter viewType={viewType} setViewType={setViewType} />

              <BasicDateTimePicker
                startDatetime={startDatetime}
                endDatetime={endDatetime}
                setStartDatetime={setStartDatetime}
                setEndDatetime={setEndDatetime}
              />

              <PlaceFilter itemPlace={itemPlace} setItemPlace={setItemPlace} />

              <ItemTypeFilter
                itemTypeLevel1={itemTypeLevel1}
                itemTypeLevel2={itemTypeLevel2}
                setItemTypeLevel1={setItemTypeLevel1}
                setItemTypeLevel2={setItemTypeLevel2}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              {viewType === "地圖顯示" ? (
                <GoogleMap pastMarkers={filteredItems} />
              ) : (
                <ImageBoard filteredItems={filteredItems} />
              )}
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <PreviewSection />
            </Grid>
          </Grid>
        </Item>
      </Box>
    </React.Fragment>
  );
};

export default MainPage;
