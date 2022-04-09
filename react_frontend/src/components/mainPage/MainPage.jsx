import React from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import ResponsiveAppBar from "./ResponsiveAppBar";
import BasicDateTimePicker from "./BasicDateTimePicker";
// import GoogleMapPicker from "./GoogleMapPicker";
import Filter from "./Filter";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

class MainPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Box sx={{ width: "100%" }}>
          <Item>
            <ResponsiveAppBar />
          </Item>
          <Item>
            <Grid container spacing={2}>
              <Grid item xs={2.5}>
                <Item>
                  <BasicDateTimePicker />
                </Item>
                {/* <Item><GoogleMapPicker /></Item> */}
                <Item>
                  <Filter />
                </Item>
                <Item>
                  <Filter />
                </Item>
              </Grid>
              <Grid item xs={7}>
                <Item>
                  Google Map
                  <Box
                    sx={{
                      width: 865,
                      height: 500,
                      backgroundColor: "primary.dark",
                      "&:hover": {
                        backgroundColor: "primary.main",
                        opacity: [0.9, 0.8, 0.7],
                      },
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                </Item>
              </Grid>
              <Grid item xs={2.5}>
                <Item>Preview</Item>
              </Grid>
            </Grid>
          </Item>
        </Box>
      </React.Fragment>
    );
  }
}

export default MainPage;
