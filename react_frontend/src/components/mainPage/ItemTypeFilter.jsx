import React from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

// Dummy data for demo display
const lostItemTypes = [
  { label: "手機" },
  { label: "學生證" },
  { label: "錢包" },
  { label: "信用卡" },
];

const ItemTypeFilter = ({ itemTypeLevel1, itemTypeLevel2 }) => {
  return (
    <Box sx={{ width: "100%", marginTop: "10px" }}>
      <h5>物品分類</h5>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={lostItemTypes}
        sx={{ width: "70%", ml: "15%", mr: "15%" }}
        renderInput={(props) => {
          return (
            <>
              <Box sx={{ width: "100%", marginTop: "10px" }}>
                <TextField {...props} label={"類型"} />
              </Box>
              <Box sx={{ width: "100%", marginTop: "10px" }}>
                <TextField {...props} label={"細項"} />
              </Box>
            </>
          );
        }}
      />
    </Box>
  );
};

export default ItemTypeFilter;
