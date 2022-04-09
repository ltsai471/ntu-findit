import React from "react";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

// npm install @date-io/date-fns
// npm install @mui/x-date-pickers

// npm i @mui/material
// npm i @mui/lab
// npm i date-fns

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicDateTimePicker() {
  const [value, setValue] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ width: "100%" }}>
        <h5>時間</h5>
        <Box sx={{ m: 2 }}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="開始"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </Box>

        <Box sx={{ m: 2 }}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="結束"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
