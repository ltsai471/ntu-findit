// import axios from "axios";
import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";

import Item from "../Item";
import TitledList from "../yourLostItems/TitledList";
import BasicDateTimePicker from "../mainPage/BasicDateTimePicker";
import PlaceFilter from "../mainPage/PlaceFilter";
import ItemTypeFilter from "../mainPage/ItemTypeFilter";
import SearchTypeFilter from "./SearchTypeFilter";
import { getLoginUser } from "../../utils";
import { getUserFoundItems } from "../../webAPI";
import i18n from "i18next";

// const changeLanguage= (val) => {
//   i18n.changeLanguage(val);
// };
// changeLanguage('en')

const YourFoundItems = () => {
  const [renderedItems, setRenderedItems] = useState([]);

  const [searchType, setSearchType] = useState("等待聯繫");
  const [itemPlace, setItemPlace] = useState("");
  const [itemTypeLevel1, setItemTypeLevel1] = useState("");
  const [itemTypeLevel2, setItemTypeLevel2] = useState("");

  const [endDatetime, setEndDatetime] = useState(new Date());
  const defaultStartDatetime = new Date(endDatetime.getTime());
  defaultStartDatetime.setMonth(defaultStartDatetime.getMonth() - 2);
  const [startDatetime, setStartDatetime] = useState(defaultStartDatetime); // two month ago

  useEffect(() => {
    const getFilteredData = async () => {
      let status = "";
      const userId = getLoginUser();
      if (searchType === "等待聯繫") status = "finding";
      else if (searchType === "聯繫中") status = "contact";
      else status = "done";

      const payload = {
        status,
        userId,
        itemPlace,
        itemTypeLevel1,
        itemTypeLevel2,
        startDatetime,
        endDatetime,
      };
      const data = await getUserFoundItems(payload);
      setRenderedItems(data);
    };
    getFilteredData();
  }, [
    searchType,
    startDatetime,
    endDatetime,
    itemPlace,
    itemTypeLevel1,
    itemTypeLevel2,
  ]);

  return (
    <>
      <Box sx={{ width: "100%", justifyContent: "center" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: "1%",
            mb: "1%",
          }}
        >
          <Typography component="h1" variant="h4">
            {i18n.t("yourfound.title")}
          </Typography>
        </Box>

        <Item sx={{ mb: "2%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3} lg={3}>
              <SearchTypeFilter
                searchType={searchType}
                setSearchType={setSearchType}
              />

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

            <Grid item xs={12} md={9} lg={9}>
              <Box
                sx={{
                  width: "100%",
                  mt: "2%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "left",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <TitledList title={searchType} listOfItems={renderedItems} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Item>
      </Box>
    </>
  );
};

export default YourFoundItems;
