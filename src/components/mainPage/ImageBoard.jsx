import React from "react";
import { Box } from "@mui/material";
import { ImageList, ImageListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ImageBoard = ({ filteredItems }) => {
  const navigate = useNavigate();
  const onImageClick = (path) => navigate(path);

  return (
    <Box sx={{ height: "80vh", width: "100%", overflowY: "scroll" }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {filteredItems.map((item, i) => {
          const content = new Uint8Array(item.imgArray);
          const photoUrl = URL.createObjectURL(
            new Blob([content.buffer], {
              type: "image/" + item.fileExtension,
            })
          );
          return (
            <ImageListItem
              key={i}
              sx={{
                "&:hover": {
                  opacity: 0.5,
                  cursor: "pointer",
                },
              }}
            >
              <img
                src={photoUrl}
                alt={item.imgFilename}
                loading="lazy"
                onClick={() => onImageClick("/chatroom")}
                sx={{ height: "80%", width: "80%" }}
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </Box>
  );
};

export default ImageBoard;
