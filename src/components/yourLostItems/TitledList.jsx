import React from "react";
import { List, Divider, Typography } from "@mui/material";
import TitledListItem from "./TitledListItem";

const TitledList = ({
  selectedItem,
  title,
  listOfItems,
  handleGetItemPairs,
  handleRemovePairs,
}) => {
  let renderedListOfItems;
  if (Array.isArray(listOfItems)) {
    listOfItems.sort(
      (a, b) => new Date(b.lossDatetime) - new Date(a.lossDatetime)
    );
    renderedListOfItems = listOfItems.flatMap((item, index, array) => {
      return (
        <div key={item.id}>
          <TitledListItem
            key={item.id}
            selectedItem={selectedItem}
            title={title}
            item={item}
            handleGetItemPairs={handleGetItemPairs}
            handleRemovePairs={handleRemovePairs}
          />
          {index !== array.length - 1 ? (
            <Divider variant="inset" component="li" />
          ) : null}
        </div>
      );
    });
  } else {
    renderedListOfItems = null;
    console.error("listOfItems is NOT an array! Cannot render items!");
  }

  return (
    <List
      sx={{
        width: "80%",
        bgcolor: "background.paper",
      }}
    >
      <Typography
        sx={{ display: "inline" }}
        component="div"
        variant="h5"
        color="text.primary"
      >
        {title}
      </Typography>
      {renderedListOfItems}
    </List>
  );
};

export default TitledList;
