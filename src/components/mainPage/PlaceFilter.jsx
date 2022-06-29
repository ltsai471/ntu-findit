import React from "react";
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

// Dummy data for demo display
let ntuLocations = [
  "舟山路",
  "管理學院一號館",
  "管理學院二號館",
  "管理學院教研館",
  "總圖書館",
  "第二學生活動中心(二活)",
  "國立臺灣大學土木工程學系系館",
  "第一學生活動中心(活大)",
  "國立臺灣大學博雅教學館",
];

if (getLanguage() == "en") {
  ntuLocations = [
    "Zhoushan Road",
    "Building 1, College of Management",
    "Building 2, College of Management",
    "Teaching and Research Building, College of Management",
    "NTU Library",
    "Second Student Activity Center",
    "Civil Engineering Building, NTU",
    "First Student Activity Center",
    "NTU Liberal Arts Teaching Hall",
  ];
}

const PlaceFilter = ({ setItemPlace }) => {
  return (
    <Box sx={{ width: "100%", marginTop: "10px" }}>
      <h5>{i18n.t("placefilter.location")}</h5>
      <Autocomplete
        disablePortal
        id="place-filter"
        options={ntuLocations}
        sx={{ width: "70%", ml: "15%", mr: "15%" }}
        renderInput={(props) => {
          return (
            <TextField {...props} label={i18n.t("placefilter.location")} />
          );
        }}
        onChange={(e, newPlace) => setItemPlace(newPlace)}
      />
    </Box>
  );
};

export default PlaceFilter;
