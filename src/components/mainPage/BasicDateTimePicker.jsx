import React, { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { getAuthToken, getLoginUser, logout, setLanguage, getLanguage } from "../../utils";
import i18n from 'i18next';
// npm install @date-io/date-fns
// npm install @mui/x-date-pickers

// npm i @mui/material
// npm i @mui/lab
// npm i date-fns


// const changeLanguage= (val) => {
//   i18n.changeLanguage(val); 
// };
// changeLanguage('en')
// i18n.changeLanguage(getLanguage()); 
export default function BasicDateTimePicker({
  startDatetime,
  endDatetime,
  setStartDatetime,
  setEndDatetime,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ width: "100%" }}>
        <h5 style={{ marginTop: "10px" }}>{i18n.t('BasicDateTimePicker.time')}</h5>

        <Box sx={{ m: 2 }}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label={i18n.t('BasicDateTimePicker.start')}
            value={startDatetime}
            onChange={setStartDatetime}
          />
        </Box>

        <Box sx={{ m: 2 }}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label={i18n.t('BasicDateTimePicker.end')}
            value={endDatetime}
            onChange={setEndDatetime}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
