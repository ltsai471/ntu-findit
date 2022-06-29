import React, { useEffect, useState } from "react";
import { ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import { getLoginUser } from "../../utils";
import { getUserItems } from "../../webAPI";

const NUM_PREVIEWS = 3;

const PreviewList = ({ content }) => {
  const [itemArray, setItemArray] = useState([]);


  useEffect(() => {
    const getItemArray = async () => {
      const userId = await getLoginUser();
      const apiCategory =
        content === "lostItems" ? "userLossItem" : "userFoundItem";
      const data = await getUserItems(apiCategory, userId);
      let temp = [...data];
      temp.sort((a, b) => new Date(b.lossDatetime) - new Date(a.lossDatetime));
      if (temp.length > NUM_PREVIEWS) temp = temp.slice(0, NUM_PREVIEWS); // Show latest two items
      setItemArray(temp);
    };
    getItemArray();
  }, []);

  const renderedItemArray = itemArray.map((item) => {
    const date = new Date(item.lossDatetime);
    const pad = (str) => String(str).padStart(2, "0");
    const renderedDate = `${date.getFullYear()}-${pad(date.getMonth())}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`; // prettier-ignore
    const content = new Uint8Array(item.imgArray);
    const photoUrl = URL.createObjectURL(
      new Blob([content.buffer], { type: 'image/' + item.fileExtension })
    );

    return (
      <ListItem key={item.id} sx={{ width: "100%" }}>
        <ListItemAvatar>
          <Avatar alt={item.itemType.name} src={photoUrl} />
        </ListItemAvatar>
        <ListItemText
          sx={{ width: "100%" }}
          primary={`${renderedDate} ${item.itemType.name}`}
          secondary={item.Desc}
        />
      </ListItem>
    );
  });
  const filteredItems = renderedItemArray.filter(
    (item) => item.lossDatetime !== null
  );
  if (!filteredItems) return null;
  if (filteredItems.length === 1) return filteredItems;
  return filteredItems.slice(0, NUM_PREVIEWS);
};

export default PreviewList;
