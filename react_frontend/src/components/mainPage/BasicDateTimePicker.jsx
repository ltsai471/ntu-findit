import React, { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

// npm install @date-io/date-fns
// npm install @mui/x-date-pickers

// npm i @mui/material
// npm i @mui/lab
// npm i date-fns

export default function BasicDateTimePicker({
  startDatetime,
  endDatetime,
  setStartDatetime,
  setEndDatetime,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ width: "100%" }}>
        <h5 style={{ marginTop: "10px" }}>時間</h5>

        <Box sx={{ m: 2 }}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="開始"
            value={startDatetime}
            onChange={(newStartTime) => setStartDatetime(newStartTime)}
          />
        </Box>

        <Box sx={{ m: 2 }}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="結束"
            value={endDatetime}
            onChange={(newEndTime) => setEndDatetime(newEndTime)}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
