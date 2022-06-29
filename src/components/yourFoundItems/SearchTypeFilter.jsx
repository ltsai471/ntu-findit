import React, { useState } from "react";
// import axios from "axios";
import TextField from "@mui/material/TextField";
// import FormHelperText from "@mui/material/FormHelperText";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import i18n from 'i18next';
import {getLanguage } from "../../utils";

// const changeLanguage= (val) => {
//   i18n.changeLanguage(val); 
// };
// changeLanguage('en')

var searchTypes = ["等待聯繫", "聯繫中", "已歸還"];
if (getLanguage() == "en"){
  searchTypes = ["waiting for contact", "contacting", "returned"];
}

const SearchTypeFilter = ({ searchType, setSearchType }) => {
  return (
    <Box sx={{ width: "100%", marginTop: "10px" }}>
      <h5>{i18n.t('searchtype.view')}</h5>
      <Autocomplete
        id="search-type-filter"
        disableClearable
        options={searchTypes}
        renderInput={(props) => <TextField {...props} label={i18n.t('searchtype.type')} />}
        value={searchType}
        onChange={(event, newSearchType) => {
          setSearchType(newSearchType);
        }}
        sx={{ width: "70%", ml: "15%", mr: "15%" }}
      />
    </Box>
  );
};

export default SearchTypeFilter;
