import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import { format } from "date-fns"; // npm install date-fns --save
import themeColor from "../../config.js";

const TitledListItem = ({ title, item }) => {
  console.log(title, item);
  const onClickToggleMatches = () => console.log("show matches");
  const onClickDelete = () => console.log("Delete this Match!!");

  const FindMatchButton = () => {
    return (
      <Button
        variant="outlined"
        onClick={onClickToggleMatches}
        style={{
          ml: "30%",
          mr: "30%",
          fontWeight: "bold",
          color: themeColor.primary,
          borderColor: themeColor.primaryLight,
          textAlign: "center",
        }}
      >
        查看自動配對案件
      </Button>
    );
  };

  const ContactButton = () => {
    return (
      <>
        <Box sx={{ mt: "10px", ml: "4px", mr: "4px" }}>
          <Button
            variant="outlined"
            onClick={onClickToggleMatches}
            style={{
              ml: "30%",
              mr: "30%",
              fontWeight: "bold",
              color: themeColor.primary,
              borderColor: themeColor.primary,
              textAlign: "center",
            }}
          >
            聯繫案主
          </Button>
        </Box>
        <Box sx={{ mt: "10px", ml: "4px", mr: "4px" }}>
          <Button
            variant="outlined"
            onClick={onClickDelete}
            style={{
              ml: "30%",
              mr: "30%",
              fontWeight: "bold",
              borderColor: "red",
              color: "red",
              textAlign: "center",
            }}
          >
            移除
          </Button>
        </Box>
      </>
    );
  };

  const customizedButton =
    title === "尋找中" ? (
      <FindMatchButton />
    ) : title === "自動配對案件" ? (
      <ContactButton />
    ) : null;

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={item.img} />
      </ListItemAvatar>
      <ListItemText
        primary={item.itemType}
        secondary={
          <>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {`${format(new Date(item.lossDatetime), "yyyy-MM-dd HH:mm:ss")}`}
              <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </Typography>
            {`${item.itemDesc}`}
          </>
        }
      />
      {customizedButton}
    </ListItem>
    // <Divider variant="inset" component="li" />
  );
};

export default TitledListItem;
