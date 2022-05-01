import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Item from "../Item";

import themeColor from "../../config.js";
import ResponsiveAppBar from "../ResponsiveAppBar";
import BasicDateTimePicker from "./BasicDateTimePicker";
// import GoogleMapPicker from "./GoogleMapPicker";
import PlaceFilter from "./PlaceFilter";
import ItemTypeFilter from "./ItemTypeFilter";
import GoogleMap from "./GoogleMap";

const MainPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [itemPlace, setItemPlace] = useState("舟");
  const [itemTypeLevel1, setItemTypeLevel1] = useState("");
  const [itemTypeLevel2, setItemTypeLevel2] = useState("");
  const [endDatetime, setEndDatetime] = useState(new Date());
  const [startDatetime, setStartDatetime] = useState(
    endDatetime.getTime() - 1000 * 60 * 60
  );

  // 透過 Filter 向後端取得對應的 data
  useEffect(() => {
    const getItemFilterData = async () => {
      const { data: itemList } = await axios.post(
        "http://140.112.106.237:16896/ntulost/item/itemsFilter/",
        {
          itemPlace,
          itemTypeLevel1,
          itemTypeLevel2,
          startDatetime,
          endDatetime,
        }
      );
      console.log("These are filtered items: ", itemList);
    };
    getItemFilterData();
  }, [itemPlace, itemTypeLevel1, itemTypeLevel2, startDatetime, endDatetime]);

  // 根據得到的 data 重新渲染頁面，包含更改 Map 的顯示、Filter 上的值等等
  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ width: "100%" }}>
        {/* <Item>
          <ResponsiveAppBar loggedIn={loggedIn} />
        </Item> */}
        <Item>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3} lg={3}>
              <>
                <BasicDateTimePicker
                  startDatetime={startDatetime}
                  endDatetime={endDatetime}
                  setStartDatetime={setStartDatetime}
                  setEndDatetime={setEndDatetime}
                />
              </>
              <>
                <PlaceFilter itemPlace={itemPlace} />
              </>
              <>
                <ItemTypeFilter
                  itemTypeLevel1={itemTypeLevel1}
                  itemTypeLevel2={itemTypeLevel2}
                />
              </>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Item>
                <GoogleMap
                  itemPlace={itemPlace}
                  itemTypeLevel1={itemTypeLevel1}
                  itemTypeLevel2={itemTypeLevel2}
                  endDatetime={endDatetime}
                  startDatetime={startDatetime}
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={3} lg={6}>
              <Item>Preview</Item>
            </Grid>
          </Grid>
        </Item>
      </Box>
    </React.Fragment>
  );
};

export default MainPage;

