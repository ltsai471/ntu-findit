import React, { useState, useEffect } from "react";
import { List, Divider, Typography } from "@mui/material";
import TitledListItem from "./TitledListItem";

const TitledList = ({ title, listOfItems }) => {
  const renderedListOfItems = listOfItems.flatMap((item, index, array) => {
    return (
      <div key={item.id}>
        <TitledListItem title={title} item={item} />
        {index !== array.length - 1 ? (
          <Divider variant="inset" component="li" />
        ) : null}
      </div>
    );
  });

  return (
    <List
      sx={{
        width: "60%",
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
