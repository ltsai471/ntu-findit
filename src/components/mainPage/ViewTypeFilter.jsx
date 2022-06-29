import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import i18n from 'i18next';
import {getLanguage } from "../../utils";

// const changeLanguage= (val) => {
//   i18n.changeLanguage(val); 
// };
// changeLanguage('en')
var viewTypes = ["地圖顯示", "照片顯示"];

if (getLanguage() == "en"){
  viewTypes = ["View on map", "View on photo"];
}

const ViewTypeFilter = ({ setViewType }) => {
  return (
    <Box sx={{ width: "100%", marginTop: "10px" }}>
      <h5>{i18n.t('viewtype.diaplay')}</h5>
      <Autocomplete
        disableClearable
        defaultValue={viewTypes[0]}
        id="view-filter"
        options={viewTypes}
        sx={{ width: "70%", ml: "15%", mr: "15%" }}
        renderInput={(props) => {
          return <TextField {...props} label={i18n.t('viewtype.diaplay')} />;
        }}
        onChange={(e, newViewType) => setViewType(newViewType)}
      />
    </Box>
  );
};

export default ViewTypeFilter;
