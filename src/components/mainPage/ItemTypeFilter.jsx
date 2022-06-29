import React, { useEffect, useState } from "react";
// import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import i18n from "i18next";
import { getLanguage } from "../../utils";

// const changeLanguage= (val) => {
//   i18n.changeLanguage(val);
// };
// changeLanguage('en')

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

const itemTypeListLevel1Eng = ["id documents", "books", "electronic devices", "personal valuables", "apparel & accesories", "stationery", "others"]; // prettier-ignore
const itemTypeListLevel2Eng = {
  "": [""],
  證件: ["student id", "identification card", "health id card"],
  電子產品: ["cellphone", "laptop", "mouse", "keyboard"],
  書本: ["textbook", "paper"],
  私人貴重物品: ["key", "wallet/purse"],
  服飾: ["shoes", "hat/cap", "shirt", "backpack", "handbag", "neck tie"],
  文具: ["scissors"],
  其他: ["bottle", "baseball", "skateboard", "tennis ball", "cup", "plate", "mirror", "bicycle", "umbrella", "others"], // prettier-ignore
};

if (getLanguage() == "en") {
  itemTypeListLevel1 = ["id_documents", "books", "electronic_devices", "personal_valuables", "apparel_and_accesories", "stationery", "others"]; // prettier-ignore
  itemTypeListLevel2 = {
    "": [""],
    id_documents: ["student id", "identification card", "health id card"],
    electronic_devices: ["cellphone", "laptop", "mouse", "keyboard"],
    books: ["textbook", "paper"],
    personal_valuable: ["key", "wallet/purse"],
    apparel_and_accesories: [
      "shoes",
      "hat/cap",
      "shirt",
      "backpack",
      "handbag",
      "neck tie",
    ],
    stationery: ["scissors"],
    others: ["bottle", "baseball", "skateboard", "tennis ball", "cup", "plate", "mirror", "bicycle", "umbrella", "others"], // prettier-ignore
  };
}

const ItemTypeFilter = ({
  itemTypeLevel1,
  itemTypeLevel2,
  setItemTypeLevel1,
  setItemTypeLevel2,
}) => {
  const [itemTypeLevel2Options, setItemTypeLevel2Options] = useState([]);

  const onItemTypeLevel1Change = (event, newItemType) => {
    setItemTypeLevel2("");
    setItemTypeLevel1(newItemType);
    if (!newItemType) return;
    setItemTypeLevel2Options(itemTypeListLevel2[newItemType]);
  };

  const onItemTypeLevel2Change = (event, newItemType) => {
    setItemTypeLevel2(newItemType);
  };

  return (
    <Box sx={{ width: "100%", marginTop: "10px" }}>
      <h5>{i18n.t("itemtypefilter.item_catogary")}</h5>
      <Autocomplete
        disablePortal
        id="item-type-filter"
        options={itemTypeListLevel1}
        onChange={onItemTypeLevel1Change}
        sx={{ width: "70%", ml: "15%", mr: "15%" }}
        value={itemTypeLevel1}
        renderInput={(props) => {
          return (
            <>
              <Box sx={{ width: "100%", marginTop: "10px" }}>
                <TextField {...props} label={i18n.t("itemtypefilter.type")} />
              </Box>
            </>
          );
        }}
      />
      <Autocomplete
        disablePortal
        id="item-type-filter"
        options={itemTypeLevel2Options}
        sx={{ width: "70%", ml: "15%", mr: "15%" }}
        value={itemTypeLevel2}
        onChange={onItemTypeLevel2Change}
        renderInput={(props) => {
          return (
            <>
              <Box sx={{ width: "100%", marginTop: "10px" }}>
                <TextField {...props} label={i18n.t("itemtypefilter.detail")} />
              </Box>
            </>
          );
        }}
      />
    </Box>
  );
};

export default ItemTypeFilter;
