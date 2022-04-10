import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

// Dummy data for demo display
const ntuLocations = [
  { label: "總圖" },
  { label: "綜合教學館 101" },
  { label: "共同教學館 101" },
  { label: "共同教學館 102" },
  { label: "舟山路" },
  { label: "椰林大道" },
];
const lostItemTypes = [
  { label: "手機" },
  { label: "學生證" },
  { label: "錢包" },
  { label: "信用卡" },
];

const filterTypeConfig = {
  location: { titleText: "地點", fieldText: "地點", options: ntuLocations },
  itemType: {
    titleText: "物品分類",
    fieldText: "類型",
    options: lostItemTypes,
  },
};

const Filter = ({ by }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <h5>{filterTypeConfig[by].titleText}</h5>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={filterTypeConfig[by].options}
        sx={{ width: "80%", ml: "8%", mr: "8%" }}
        renderInput={(params) => {
          console.log(params);
          return (
            <TextField {...params} label={filterTypeConfig[by].fieldText} />
          );
        }}
      />
    </Box>
  );
};

export default Filter;
