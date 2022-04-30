import React from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

// Dummy data for demo display
const ntuLocations = [
  { label: "總圖" },
  { label: "綜合教學館" },
  { label: "共同教學館" },
  { label: "管一" },
  { label: "管二" },
  { label: "教研館" },
  { label: "舟山路" },
  { label: "椰林大道" },
  { label: "小椰林道" },
];

const PlaceFilter = ({ itemPlace }) => {
  return (
    <Box sx={{ width: "100%", marginTop: "10px" }}>
      <h5>地點</h5>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={ntuLocations}
        sx={{ width: "70%", ml: "15%", mr: "15%" }}
        renderInput={(props) => {
          return <TextField {...props} label={"地點"} />;
        }}
      />
    </Box>
  );
};

export default PlaceFilter;
