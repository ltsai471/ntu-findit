import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { styled, Typography, List, MenuItem } from "@mui/material";
import PreviewList from "./PreviewList";
import i18n from 'i18next';

// const changeLanguage= (val) => {
//   i18n.changeLanguage(val); 
// };
// changeLanguage('en')

function generate(element) {
  return [0, 1].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const PreviewSection = () => {
  const navigate = useNavigate();
  const onClickRedirect = (path) => {
    navigate(path);
  };
  return (
    <>
      <MenuItem
        key="your-lost-items-title"
        onClick={() => onClickRedirect("/yourlostitems")}
        sx={{ justifyContent: "center" }}
      >
        <Typography sx={{ mt: 1, mb: 1 }} variant="h5" component="div">
          {i18n.t('preview.Items_you_lost')}
        </Typography>
      </MenuItem>

      <Demo>
        <List dense={false}>
          <PreviewList content="lostItems" />
        </List>
      </Demo>
      <MenuItem
        key="your-found-items-title"
        onClick={() => onClickRedirect("/yourfounditems")}
        sx={{ justifyContent: "center" }}
      >
        <Typography sx={{ mt: 1, mb: 1 }} variant="h5" component="div">
          {i18n.t('preview.Items_you_found')}
        </Typography>
      </MenuItem>
      <Demo>
        <List dense={false}>
          <PreviewList content="foundItems" />
        </List>
      </Demo>
    </>
  );
};

export default PreviewSection;
