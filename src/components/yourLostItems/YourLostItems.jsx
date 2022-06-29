import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import TitledList from "./TitledList";
import i18n from 'i18next';

// const changeLanguage= (val) => {
//   i18n.changeLanguage(val); 
// };
// changeLanguage('en')

import { getLoginUser } from "../../utils";
import { getUserLossItem, getLossItemPair, removeItempair } from "../../webAPI";


const YourLostItems = () => {
  const [findingItems, setFindingItems] = useState([]);
  const [selectedItem, setselectedItem] = useState(0);
  const [matchedItems, setMatchedItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);

  useEffect(() => {
    getUserLossItem(getLoginUser()).then((data) => {
      setFindingItems(data.filter(({ status }) => status === "finding"));
      setDoneItems(data.filter(({ status }) => status === "done"));
    });
  }, []);

  const handleGetItemPairs = useCallback(
    (e) => {
      const itemId = e.currentTarget.getAttribute("value");
      getLossItemPair(itemId).then((data) => {
        setselectedItem(itemId);
        setMatchedItems(data);
      });
    },
    [],
  );

  const handleRemovePairs = useCallback(
    (e) => {
      const lossItemId = e.currentTarget.getAttribute("lossItemId");
      const foundItemId = e.currentTarget.getAttribute("foundItemId");
      removeItempair(lossItemId, foundItemId).then((response) => {
        alert("移除成功！");
      });
      getLossItemPair(lossItemId).then((data) => {
        setselectedItem(lossItemId);
        setMatchedItems(data);
      });
    },
    [],
  );


  return (
    <>
      <Box
        sx={{
          width: "100%",
          mt: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: "1%",
            mb: "1%",
          }}
        >
          <Typography component="h1" variant="h4">
            {i18n.t('yourlost.title')}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TitledList
            selectedItem={selectedItem}
            title={i18n.t('yourlost.Finding')}
            listOfItems={findingItems}
            handleGetItemPairs={handleGetItemPairs}
            handleRemovePairs={handleRemovePairs} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TitledList
            selectedItem={selectedItem}
            title={i18n.t('yourlost.match')}
            listOfItems={matchedItems}
            handleGetItemPairs={handleGetItemPairs}
            handleRemovePairs={handleRemovePairs} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TitledList
            selectedItem={selectedItem}
            title={i18n.t('yourlost.found')}
            listOfItems={doneItems}
            handleGetItemPairs={handleGetItemPairs}
            handleRemovePairs={handleRemovePairs} />
        </Box>
      </Box>
    </>
  );
};

export default YourLostItems;
