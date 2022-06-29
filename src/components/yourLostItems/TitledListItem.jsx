import React from "react";
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
import { themeColor } from "../../config.js";
import { getUserInfo } from "../../webAPI";
import i18n from "i18next";

const TitledListItem = ({
  selectedItem,
  title,
  item,
  handleGetItemPairs,
  handleRemovePairs,
}) => {
  const handleReturnItem = () => {
    window.location.replace(`/lostReturn?id=${item.id}
    &lossDatetime=${item.lossDatetime}
    &itemPlace=${item.itemPlace.name}
    &itemType=${item.itemType.name}`);
  };

  const handleContect = () => {
    getUserInfo(item.accountId).then((response) => {
      window.location.replace(`/chatroom?itemId=${item.id}&target=${response.name}&targetAccount=${item.accountId.split('@')[0]}&photo=&caseName=遺失物-${item.itemType.name}`);

      // setUsername(response.name);
      // const content = new Uint8Array(response.photo);
      // setPhotoUrl(URL.createObjectURL(
      //   new Blob([content.buffer], { type: 'image/' + response.fileExtension })
      // ));
    });
    // window.location.replace(`/chatroom?itemId=${item.id}
    // &target=${item.target.name}
    // &targetAccount=${item.target.username}
    // &photo=${item.target.photo}
    // &caseName=遺失物-${item.itemType.name}`);
  };

  const FindMatchButton = () => {
    return (
      <Button
        value={item.id}
        variant="outlined"
        onClick={handleGetItemPairs}
        style={{
          ml: "30%",
          mr: "30%",
          fontWeight: "bold",
          color: themeColor.primary,
          borderColor: themeColor.primaryLight,
          textAlign: "center",
        }}
      >
        {i18n.t("add.view")}
      </Button>
    );
  };

  const ContactButton = () => {
    return (
      <>
        <Box sx={{ mt: "10px", ml: "4px", mr: "4px" }}>
          <Button
            variant="outlined"
            onClick={handleContect}
            style={{
              ml: "30%",
              mr: "30%",
              fontWeight: "bold",
              color: themeColor.primary,
              borderColor: themeColor.primary,
              textAlign: "center",
            }}
          >
            {i18n.t("add.contact")}
          </Button>
        </Box>
        <Box sx={{ mt: "10px", ml: "4px", mr: "4px" }}>
          <Button
            lossItemId={selectedItem}
            foundItemId={item.id}
            variant="outlined"
            onClick={handleRemovePairs}
            style={{
              ml: "30%",
              mr: "30%",
              fontWeight: "bold",
              borderColor: "red",
              color: "red",
              textAlign: "center",
            }}
          >
            {i18n.t("add.remove")}
          </Button>
        </Box>
      </>
    );
  };

  const ReturnItemButton = () => {
    return (
      <Button
        value="test1"
        variant="outlined"
        onClick={handleReturnItem}
        style={{
          ml: "30%",
          mr: "30%",
          fontWeight: "bold",
          color: themeColor.primary,
          borderColor: themeColor.primaryLight,
          textAlign: "center",
        }}
      >
        {i18n.t("add.return")}
      </Button>
    );
  };

  const customizedButton = [];
  if (title === "尋找中") customizedButton.push(<FindMatchButton />);
  else if (title === "自動配對案件") customizedButton.push(<ContactButton />);
  else if (title === "等待聯繫" || title === "已歸還")
    customizedButton.push(<ReturnItemButton />);

  const content = new Uint8Array(item.imgArray);
  const photoUrl = URL.createObjectURL(
    new Blob([content.buffer], { type: "image/" + item.fileExtension })
  );

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        {/* <Avatar alt="Remy Sharp" src={item.img} /> */}
        <Avatar alt="Remy Sharp" src={photoUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={item.itemType.name}
        secondary={
          <>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {format(new Date(item.lossDatetime), "yyyy-MM-dd HH:mm:ss")}
              <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </Typography>
            {item.itemDesc}
          </>
        }
      />
      {customizedButton}
    </ListItem>
  );
};

export default TitledListItem;
