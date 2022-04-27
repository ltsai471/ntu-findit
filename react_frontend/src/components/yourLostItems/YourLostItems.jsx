import axios from "axios";
import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "../ResponsiveAppBar";
import { Box, Paper, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Item from "../Item";
import TitledList from "./TitledList";

const data = [
  {
    id: 10,
    status: "finding",
    lossDatetime: "2021-08-04T21:53:17+08:00",
    itemPlace: "50 Paget Junction",
    preservePlace: "4 Merrick Trail",
    itemType: "鑰匙",
    itemDesc: "一把有點生鏽的鑰匙",
    img: null,
  },
  {
    id: 62,
    status: "finding",
    lossDatetime: "2022-04-11T09:48:00+08:00",
    itemPlace: "舟山路",
    preservePlace: "xx保管處",
    itemType: "學生證",
    itemDesc: "b07501024的學生證",
    img: "/media/images/idcard_0gBT4at.jpg",
  },
  {
    id: 11,
    status: "matching",
    lossDatetime: "2021-08-02T21:53:17+08:00",
    itemPlace: "50 Paget Junction",
    preservePlace: "4 Merrick Trail",
    itemType: "鑰匙",
    itemDesc: "一把有點生鏽的鑰匙",
    img: null,
  },
  {
    id: 64,
    status: "done",
    lossDatetime: "2022-04-01T09:48:00+08:00",
    itemPlace: "舟山路",
    preservePlace: "xx保管處",
    itemType: "學生證",
    itemDesc: "b07501024的學生證",
    img: "/media/images/idcard_0gBT4at.jpg",
  },
];

const YourLostItems = () => {
  const [findingItems, setFindingItems] = useState([]);
  const [matchedItems, setMatchedItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);

  useEffect(() => {
    const getYourLostItems = async () => {
      //   const { data } = await axios.get(
      //     "http://localhost:8000/ntulost/item/userLossItem/?itemOwnerId=10"
      //   );
      //   const lostItems = data.filter(
      //     ({ foundOrLoss }) => foundOrLoss === "loss" //遺失物
      //   );
      setFindingItems(data.filter(({ status }) => status === "finding"));
      setMatchedItems(data.filter(({ status }) => status === "matching"));
      setDoneItems(data.filter(({ status }) => status === "done"));
    };
    getYourLostItems();
  }, []);
  return (
    <>
      <Box>
        <ResponsiveAppBar />
      </Box>
      <Box
        sx={{
          width: "100%",
          mt: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TitledList title={"尋找中"} listOfItems={findingItems} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TitledList title={"自動配對案件"} listOfItems={matchedItems} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TitledList title={"已尋回"} listOfItems={doneItems} />
        </Box>
      </Box>
    </>
  );
};

export default YourLostItems;
